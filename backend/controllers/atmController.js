const Account = require("../models/Account");

const signup = async (req, res) => {
  try {
    const { name, accountNumber, pin } = req.body;

    // Validation
    if (!name || !accountNumber || !pin) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!/^\d+$/.test(accountNumber)) {
      return res.status(400).json({
        message: "Account number must contain only digits",
      });
    }

    if (accountNumber.length < 4) {
      return res.status(400).json({
        message: "Account number must be at least 4 digits",
      });
    }

    if (!/^\d{4,6}$/.test(pin)) {
      return res.status(400).json({
        message: "PIN must be 4-6 digits",
      });
    }

    if (name.length < 2) {
      return res.status(400).json({
        message: "Name must be at least 2 characters",
      });
    }

    const existingUser = await Account.findOne({
      accountNumber,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "This account number already exists",
      });
    }

    const account = await Account.create({
      name,
      accountNumber,
      pin,
      balance: 0,
    });

    res.status(201).json({
      message: "Account created successfully",
      account,
    });
  } catch (error) {
    console.error("Signup error:", error);
    
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors)
        .map(err => err.message)
        .join(", ");
      return res.status(400).json({
        message: messages,
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Account number already exists",
      });
    }

    res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { accountNumber, pin } = req.body;

    const account = await Account.findOne({
      accountNumber,
      pin,
    });

    if (!account) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.json(account);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const checkBalance = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const account = await Account.findOne({
      accountNumber,
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deposit = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    account.balance += Number(amount);

    await account.save();

    res.json({
      message: "Deposit successful",
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const withdraw = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    if (account.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    account.balance -= Number(amount);

    await account.save();

    res.json({
      message: "Withdrawal successful",
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  checkBalance,
  deposit,
  withdraw,
};

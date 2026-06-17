const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    accountNumber: {
      type: String,
      required: [true, "Account number is required"],
      unique: true,
      trim: true,
      match: [/^\d+$/, "Account number must contain only digits"],
      minlength: [4, "Account number must be at least 4 digits"],
    },
    pin: {
      type: String,
      required: [true, "PIN is required"],
      match: [/^\d{4,6}$/, "PIN must be 4-6 digits"],
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, "Balance cannot be negative"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);

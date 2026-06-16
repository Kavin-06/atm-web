import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import Dashboard from "./dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

 const handleLogout = () => {
  setUser(null);
};

if (user) {
  return (
    <Dashboard
      user={user}
      onLogout={handleLogout}
    />
  );
}
  return (
    <>
      {showLogin ? (
        <Login
          setUser={setUser}
          setShowLogin={setShowLogin}
        />
      ) : (
        <Signup
          setShowLogin={setShowLogin}
        />
      )}
    </>
  );
}

export default App;
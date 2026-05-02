import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Todo from "./components/Todo";

function App() {
  const { user, logout, login } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  if (user) {
    return (
      <div>
        <button onClick={logout}>Logout</button>
        <Todo />
      </div>
    );
  }

  return (
    <div>
      {showRegister ? (
        <>
          <Register onRegister={login} />
          <p>
            Already have an account?{" "}
            <button onClick={() => setShowRegister(false)}>Login</button>
          </p>
        </>
      ) : (
        <>
          <Login onLogin={login} />
          <p>
            Don't have an account?{" "}
            <button onClick={() => setShowRegister(true)}>Register</button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
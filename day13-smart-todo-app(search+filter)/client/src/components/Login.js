import { useState, useContext } from "react";
import axios from "../axios";
import { AuthContext } from "../context/AuthContext";
import Register from "./Register"; 
import "../App.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false); 

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("/users/login", form);
      login(data); // save token in context
    } catch (err) {
      if (err.response?.status === 401) {
        
        setError("User not found. Please register first.");
        setShowRegister(true);
      } else {
        setError(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  if (showRegister) {
    return <Register message={error} />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submit}>
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <input
          className="login-input"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="login-button">Login</button>
      </form>
    </div>
  );
}

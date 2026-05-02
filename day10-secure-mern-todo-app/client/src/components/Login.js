import { useState, useContext } from "react";
import axios from "../axios"; // make sure path is correct
import { AuthContext } from "../context/AuthContext";
import "../App.css"; // CSS import

export default function Login() {
  const { saveUser } = useContext(AuthContext);
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/login", form);
      saveUser(data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="login-container"> {/* container needed */}
      <form className="login-form" onSubmit={submit}>
        <h2 className="login-title">Login</h2>
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
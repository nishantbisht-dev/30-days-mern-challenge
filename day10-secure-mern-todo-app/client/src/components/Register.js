import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios"; 
import { AuthContext } from "../context/AuthContext";

import "../App.css"; // import your CSS

export default function Register() {
  const { saveUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/register", form);
      saveUser(data);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={submit}>
        <h2 className="register-title">Register</h2>

        <input
          className="register-input"
          placeholder="Name"
          type="text"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="register-input"
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="register-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" className="register-button">
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
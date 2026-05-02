import { useState } from "react";
import axios from "../axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/users/register", form); // make sure this matches backend
      console.log("Registration success:", res.data);

      // Redirect to login
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);

      if (err.response) {
        // Backend responded with error
        if (err.response.status === 409) {
          setError("Email already exists.");
        } else if (err.response.status === 400) {
          setError("Invalid data. Please check your inputs.");
        } else {
          setError(`Server error: ${err.response.status}`);
        }
      } else {
        setError("Network error or server not reachable.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Register</h2>
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Name"
            className="register-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="register-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="register-input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="register-button" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
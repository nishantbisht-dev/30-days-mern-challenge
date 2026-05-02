// import { useState } from "react";
// import axios from "../axios"; 
// import "../App.css"; 

// export default function Login({ onLogin }) {
//   const [form, setForm] = useState({});

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/users/login", form);
//       onLogin(data); // call context login function
//     } catch (err) {
//       console.log(err.response?.data || err.message);
      
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={submit}>
//         <h2 className="login-title">Login</h2>
//         <input
//           className="login-input"
//           placeholder="Email"
//           value={form.email || ""}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           className="login-input"
//           type="password"
//           placeholder="Password"
//           value={form.password || ""}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button className="login-button">Login</button>
//       </form>
//     </div>
//   );
// }

import { useState, useContext } from "react";
import axios from "../axios";
import { AuthContext } from "../context/AuthContext";
import Register from "./Register"; // import Register component
import "../App.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false); // new state

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("/users/login", form);
      login(data); // save token in context
    } catch (err) {
      if (err.response?.status === 401) {
        // first-time login / user doesn't exist
        setError("User not found. Please register first.");
        setShowRegister(true); // show register page
      } else {
        setError(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  if (showRegister) {
    return <Register message={error} />; // pass message to Register
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
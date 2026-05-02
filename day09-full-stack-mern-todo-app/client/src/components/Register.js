import { useState, useContext } from "react";
import axios from "../axiosConfig";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/users/register", {
      name,
      email,
      password,
    });
    login(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)} />

      <input placeholder="Email" 
      value={email}
      onChange={(e) => setEmail(e.target.value)} />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Register</button>
    </form>
  );
}

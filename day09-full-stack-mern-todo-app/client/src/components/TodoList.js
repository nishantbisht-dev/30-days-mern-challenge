import { useEffect, useState, useContext } from "react";
import axios from "../axiosConfig";
import { AuthContext } from "../context/AuthContext";

export default function TodoList() {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get("/todos", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTodos(data);
    };
    if (user) fetchTodos();
  }, [user]);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          {todo.title} - {todo.completed ? "✅" : "❌"}
        </li>
      ))}
    </ul>
  );
}

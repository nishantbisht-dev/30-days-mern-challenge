import { useState, useEffect, useContext } from "react";
import axios from "../axios";
import { AuthContext } from "../context/AuthContext";
import "./Todo.css";

export default function Todo() {
  const { user, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch todos on mount
  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  // Fetch all todos from backend
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/todos", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTodos(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to fetch todos.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new todo
  const addTodo = async () => {
    if (!title.trim()) return; // Prevent empty todo
    try {
      const res = await axios.post(
        "/todos",
        { title },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTodos([...todos, res.data]);
      setTitle("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to add todo.");
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to delete todo.");
    }
  };

  // Toggle completion
  const toggleTodo = async (id) => {
    try {
      const res = await axios.put(
        `/todos/${id}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to update todo.");
    }
  };

  if (!user) {
    return <div>Please login to see your todos.</div>;
  }

  return (
    <div className="container">
      <h2>Todo App</h2>

      {error && <p className="error">{error}</p>}

      <div className="add-todo">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {loading ? (
        <p>Loading todos...</p>
      ) : todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="todo">
            <span
              onClick={() => toggleTodo(todo._id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.completed ? "✔️ " : ""} {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </div>
        ))
      )}
    </div>
  );
}
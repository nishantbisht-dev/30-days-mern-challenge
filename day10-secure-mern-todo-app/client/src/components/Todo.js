import { useEffect, useState, useContext } from "react";
import axios from "../axios"; // make sure this points to your axiosconfig
import { AuthContext } from "../context/AuthContext";

import "../Todo.css"; // separate CSS file for Todo page

export default function Todo() {
  const { user, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/todos", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setTodos(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      } catch (err) {
        console.log(err.response?.data || err.message);
        setLoading(false);
      }
    };
    fetchTodos();
  }, [user]);

  const addTodo = async () => {
    if (!title) return;
    try {
      const res = await axios.post(
        "/todos",
        { title },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTodos([...todos, res.data]);
      setTitle("");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>My Todos</h2>
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>

      <div className="todo-input-container">
        <input
          className="todo-input"
          placeholder="Add todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="todo-add-button" onClick={addTodo}>Add</button>
      </div>

      <div className="todo-list">
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="no-todos">No todos</p>
        ) : (
          todos.map((t) => (
            <div key={t._id} className="todo-item">
              {t.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
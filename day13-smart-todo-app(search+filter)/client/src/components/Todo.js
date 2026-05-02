import { useState, useEffect, useContext } from "react";
import axios from "../axios";
import { AuthContext } from "../context/AuthContext";
import "./Todo.css";

export default function Todo() {
  const { user, logout } = useContext(AuthContext);

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("dark")) || false
  );

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  const fetchTodos = async () => {
    const res = await axios.get("/todos", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title) return;

    const res = await axios.post(
      "/todos",
      { title },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    setTodos([...todos, res.data]);
    setTitle("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/todos/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    setTodos(todos.filter((t) => t._id !== id));
  };

  const toggleTodo = async (id) => {
    const res = await axios.put(
      `/todos/${id}`,
      {},
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
  };

  // FILTER LOGIC
  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    });

  return (
    <div className={dark ? "container dark" : "container"}>
      <div className="top">
        <h2>Todo App</h2>
        <button onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      

      {/* INPUT */}
      <div className="inputBox">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* SEARCH */}
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {/* TODOS */}
      {filteredTodos.map((todo) => (
        <div key={todo._id} className="todo">
          <span
            onClick={() => toggleTodo(todo._id)}
            className={todo.completed ? "completed" : ""}
          >
            {todo.title}
          </span>

          <button onClick={() => deleteTodo(todo._id)}>❌</button>
        </div>
      ))}
    </div>
  );
}
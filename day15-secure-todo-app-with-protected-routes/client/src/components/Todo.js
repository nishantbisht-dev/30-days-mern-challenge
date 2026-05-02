import { useState, useEffect, useContext } from "react";
import axios from "../axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./Todo.css";

export default function Todo() {
  const { user, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("dark")) || false,
  );

  // FETCH TODOS
  useEffect(() => {
    fetchTodos();
  }, []);

  // SAVE DARK MODE

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/todos", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTodos(res.data);
    } catch {
      toast.error("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  // ADD TODO
  const addTodo = async () => {
    if (!title) return toast.error("Enter something!");
    try {
      const res = await axios.post(
        "/todos",
        { title },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      setTodos([...todos, res.data]);
      setTitle("");
      toast.success("Todo added!");
    } catch {
      toast.error("Error adding todo");
    }
  };

  // DELETE

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTodos(todos.filter((t) => t._id !== id));
      toast.success("Deleted!");
    } catch {
      toast.error("Delete failed");
    }
  };

  // TOGGLE COMPLETE
  const toggleTodo = async (todo) => {
    try {
      const res = await axios.put(
        `/todos/${todo._id}`,
        { completed: !todo.completed },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      setTodos(todos.map((t) => (t._id === todo._id ? res.data : t)));
    } catch {
      toast.error("Update failed");
    }
  };

  // START EDIT

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.title);
  };

  // SAVE EDIT

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(
        `/todos/${id}`,
        { title: editText },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
      setEditingId(null);
      toast.success("Updated!");
    } catch {
      toast.error("Edit failed");
    }
  };
  //

  // 🔍 FILTER + SEARCH LOGIC
  const filteredTodos = todos
    .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    });
  return (
    <div className={dark ? "container dark" : "container"}>
      {/* HEADER */}
      <div className="top">
        {" "}
        <h2>Todo App</h2>

        <button className="logout" onClick={logout}>
          Logout
        </button>

        <button onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</button>
      </div>


      
      {/* ADD TODO */}
      <div className="inputBox">
        
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add todo..."
        />
        <button onClick={addTodo}>Add</button>{" "}
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
      {/* LOADING */} {loading && <p>Loading...</p>} {/* TODOS */}
      {filteredTodos.map((todo) => (
        <div key={todo._id} className="todo">
          
          {editingId === todo._id ? (
            <>
              
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => saveEdit(todo._id)}>💾</button>:
            </>
          ) : (
            <>
              
              <span
                onClick={() => toggleTodo(todo)}
                className={todo.completed ? "completed" : ""}
              >
                {todo.title}
              </span>
              
              <div>
                <button onClick={() => startEdit(todo)}>✏️</button>
                <button onClick={() => deleteTodo(todo._id)}>❌</button>
              </div>{" "}
            </>
          )}
          
        </div>
      ))}
      
    </div>
  );
}

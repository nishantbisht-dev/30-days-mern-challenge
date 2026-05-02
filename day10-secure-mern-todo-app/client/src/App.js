import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Register from "./components/Register";
import Login from "./components/Login";
import Todo from "./components/Todo";
import Protected from "./components/Protected";

import "./App.css";

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* If already logged in, redirect to todos */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/todos" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/todos" />}
        />
        <Route
          path="/todos"
          element={
            <Protected>
              <Todo />
            </Protected>
          }
        />
        {/* Default route */}
        <Route path="*" element={<Navigate to={user ? "/todos" : "/login"} />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
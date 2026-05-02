import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Todo from "./components/Todo";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <Router>
     
      <Routes>
        
        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        {/* PROTECTED ROUTE */}
        <Route
          path="/"
          element={user ? <Todo /> : <Navigate to="/login" />}
        />{" "}
      </Routes>
    </Router>
  );
}
export default App;

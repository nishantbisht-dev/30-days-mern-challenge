import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import TodoList from "./components/TodoList";

function App() {
    return (
        <AuthProvider>
            <h1>MERN Todo App</h1>
            <Register />
            <Login />
            <TodoList />
        </AuthProvider>
    );
}

export default App;

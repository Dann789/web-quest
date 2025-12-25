import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

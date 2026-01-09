import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import AppRouter from "./routes";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white">

        <AppRouter />
      </div>
    </Router>
  );
}

export default App;

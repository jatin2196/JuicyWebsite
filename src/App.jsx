import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">JuicyWeb</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-400 transition">
              About
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateEdit from "./pages/CreateEdit";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreateEdit />} />
          <Route path="/edit/:id" element={<CreateEdit />} />
        </Routes>
      </main>
    </div>
  );
}

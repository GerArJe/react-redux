import Pokemones from "./components/Pokemones";

import Login from "./components/Login";
import Navbar from "./components/Navbar";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container mt-3">
      <Navbar />
      <Routes>
        <Route path="/" element={<Pokemones />} exact />
        <Route path="/login" element={<Login />} exact />
      </Routes>
    </div>
  );
}

export default App;

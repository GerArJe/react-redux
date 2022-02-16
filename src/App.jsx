import React from "react";
import Pokemones from "./components/Pokemones";

import Login from "./components/Login";
import Navbar from "./components/Navbar";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Perfil from "./components/Perfil";

function App() {
  const activo = useSelector((store) => store.usuario.activo);
  let navigate = useNavigate();

  React.useEffect(() => {
    if (!activo) {
      navigate("login");
      return;
    }
  }, [navigate, activo]);

  return (
    <div className="container mt-3">
      <Navbar />
      <Routes>
        <Route path="/" element={<Pokemones />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

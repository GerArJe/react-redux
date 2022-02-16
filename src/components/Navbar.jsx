import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cerrarSesionAccion } from "../redux/usuarioDucks";

const Navbar = () => {
  const dispatch = useDispatch();
  const activo = useSelector((store) => store.usuario.activo);
  let navigate = useNavigate();

  const cerrarSesion = () => {
    dispatch(cerrarSesionAccion());
    navigate("/login");
  };
  return (
    <div className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        APP POKE
      </Link>
      <div className="d-flex">
        {activo ? (
          <>
            <NavLink className="btn btn-dark" to="/">
              Inicio
            </NavLink>
            <NavLink className="btn btn-dark" to="/perfil">
              Perfil
            </NavLink>
            <button className="btn btn-dark" onClick={() => cerrarSesion()}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <NavLink className="btn btn-dark mx-2" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;

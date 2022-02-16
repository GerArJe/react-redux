import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ingresoUsuarioAccion } from "../redux/usuarioDucks";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.usuario.loading);
  const activo = useSelector((store) => store.usuario.activo);
  let navigate = useNavigate();

  React.useEffect(() => {
    if (activo) {
      navigate("/");
    }
  }, [activo, navigate]);

  return (
    <div className="mt-5 text-center">
      <h3>Ingreso con Google</h3>
      <hr />
      <button
        className="btn btn-dark"
        onClick={() => {
          dispatch(ingresoUsuarioAccion());
        }}
        disabled={loading}
      >
        Acceder
      </button>
    </div>
  );
};

export default Login;

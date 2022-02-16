import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actualizarUsuarioAccion,
  editarFotoAccion,
} from "../redux/usuarioDucks";

const Perfil = () => {
  const usuario = useSelector((store) => store.usuario.user);
  const loading = useSelector((store) => store.usuario.loading);
  const dispatch = useDispatch();

  const [nombreUsuario, setNombreUsuario] = React.useState(usuario.displayName);
  const [activarFormulario, setActivarFormulario] = React.useState(false);
  const [error, setError] = React.useState(false);

  const actualizarUsuario = () => {
    if (!nombreUsuario.trim()) {
      console.log("Nombre vacío");
      return;
    }
    dispatch(actualizarUsuarioAccion(nombreUsuario));
    setActivarFormulario(false);
  };

  const seleccionarArchivo = (imagen) => {
    const imagenCliente = imagen.target.files[0];

    if (imagenCliente === undefined) {
      console.log("No se selecciono imagen");
      return;
    }
    if (
      imagenCliente.type === "image/jpeg" ||
      imagenCliente.type === "image/png" ||
      imagenCliente.type === "image/jpg"
    ) {
      dispatch(editarFotoAccion(imagenCliente));
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="mt-5 text-center">
      <div className="card">
        <div className="card-body">
          <img
            src={usuario.photoURL}
            alt=""
            width="100px"
            className="img-fluid"
          />
          <h5 className="card-title">{usuario.displayName}</h5>
          <p className="card-text">{usuario.email}</p>
          <button
            className="btn btn-dark"
            onClick={() => setActivarFormulario(true)}
          >
            Editar nombre
          </button>

          {error && (
            <div className="alert alert-warning mt-2">
              {" "}
              Solo archivos .png .jpg .jpeg
            </div>
          )}
          <div className="input-group justify-content-center">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile02"
              style={{ display: "none" }}
              onChange={(e) => seleccionarArchivo(e)}
              disabled={loading}
            />
            <label
              className={
                loading ? "btn btn-dark mt-2 disabled" : "btn btn-dark mt-2"
              }
              htmlFor="inputGroupFile02"
              style={{ borderRadius: "0.25rem" }}
            >
              Actualizar Imagen
            </label>
          </div>
        </div>
        {loading && (
          <div className="car-body">
            <div className="d-flex justify-content-center my-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
        {activarFormulario && (
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                  />
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={() => actualizarUsuario()}
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;

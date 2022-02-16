import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";

// constantes
const dataInicial = {
  loading: false,
  activo: false,
};

// types
const LOADING = "LOADING";
const USUARIO_ERROR = "USUARIO_ERROR";
const USUARIO_EXITO = "USUARIO_EXITO";
const CERRAR_SESION = "CERRAR_SESION";

// reducer
export default function usuarioReducer(state = dataInicial, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case USUARIO_ERROR:
      return { ...dataInicial };
    case USUARIO_EXITO:
      return { ...state, loading: false, user: action.payload, activo: true };
    case CERRAR_SESION:
      return { ...dataInicial };
    default:
      return { ...state };
  }
}

// acciones
export const ingresoUsuarioAccion = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const res = await signInWithPopup(auth, provider);
    const payload = { uid: res.user.uid, email: res.user.email };
    dispatch({
      type: USUARIO_EXITO,
      payload,
    });

    localStorage.setItem("usuario", JSON.stringify(payload));
  } catch (error) {
    console.error(error);
    dispatch({
      type: USUARIO_ERROR,
    });
  }
};

export const leerUsuarioActicoAccion = () => async (dispatch) => {
  if (localStorage.getItem("usuario")) {
    dispatch({
      type: USUARIO_EXITO,
      payload: JSON.parse(localStorage.getItem("usuario")),
    });
  }
};

export const cerrarSesionAccion = () => async (dispatch) => {
  signOut(auth);
  localStorage.removeItem("usuario");
  dispatch({
    type: CERRAR_SESION,
  });
};

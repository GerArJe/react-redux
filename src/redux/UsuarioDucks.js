import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, provider, db, storage } from "../firebase";

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

    const usuario = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
    };

    const docRef = doc(db, "usuarios", usuario.email);
    const usuarioDB = await getDoc(docRef);
    if (usuarioDB.exists()) {
      dispatch({
        type: USUARIO_EXITO,
        payload: usuarioDB.data(),
      });

      localStorage.setItem("usuario", JSON.stringify(usuarioDB.data()));
    } else {
      await setDoc(docRef, usuario);
      dispatch({
        type: USUARIO_EXITO,
        payload: usuario,
      });

      localStorage.setItem("usuario", JSON.stringify(usuario));
    }
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

export const actualizarUsuarioAccion =
  (nombreActualizado) => async (dispatch, getState) => {
    dispatch({
      type: LOADING,
    });

    const { user } = getState().usuario;

    try {
      const docRef = doc(db, "usuarios", user.email);
      await updateDoc(docRef, { displayName: nombreActualizado });
      const usuario = {
        ...user,
        displayName: nombreActualizado,
      };

      dispatch({
        type: USUARIO_EXITO,
        payload: usuario,
      });

      localStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (error) {
      console.error(error);
    }
  };

export const editarFotoAccion =
  (imagenEditada) => async (dispatch, getState) => {
    dispatch({
      type: LOADING,
    });

    const { user } = getState().usuario;

    try {
      const imagenRef = ref(storage, `${user.email}/foto perfil`);
      await uploadBytes(imagenRef, imagenEditada);
      const imagenURL = await getDownloadURL(
        ref(storage, `${user.email}/foto perfil`)
      );

      const docRef = doc(db, "usuarios", user.email);
      await updateDoc(docRef, { photoURL: imagenURL });

      const usuario = { ...user, photoURL: imagenURL };

      dispatch({
        type: USUARIO_EXITO,
        payload: usuario,
      });

      localStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (error) {
      console.error(error);
    }
  };

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import pokeReducer from "./pokeDucks";
import usuarioReducer, { leerUsuarioActicoAccion } from "./usuarioDucks";

const rootReducer = combineReducers({
  pokemones: pokeReducer,
  usuario: usuarioReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  leerUsuarioActicoAccion()(store.dispatch);
  return store;
}

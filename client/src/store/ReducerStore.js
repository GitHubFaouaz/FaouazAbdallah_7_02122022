import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // thunk permet de faire des requettes asynch ;distribuer des actions
import { reducers } from "../reducers";
import { sign_Up } from "../action/AuthActions";

// // on envoi dans le localStorage
// function saveToLocalStorage(store) {
//   try {
//     const serializedStore = JSON.stringify(store);
//     window.localStorage.setItem("store", serializedStore);
//   } catch (e) {
//     console.log(e);
//   }
// }
// // chargement  pour voir s'il ya des info
// function loadFromLocalStorage() {
//   try {
//     const serializedStore = window.localStorage.getItem("store");
//     if (serializedStore === null) return undefined;
//     return JSON.parse(serializedStore);
//   } catch (e) {
//     console.log(e);
//     return undefined;
//   }
// }
// //recevoir les info
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const persistedState = loadFromLocalStorage();

const store = createStore(
  reducers,
  // persistedState,
  // composeEnhancers(applyMiddleware(thunk))
  composeWithDevTools(applyMiddleware(thunk))
);

// store.subscribe(() => saveToLocalStorage(store.getState()));
store.dispatch(sign_Up());

export default store;

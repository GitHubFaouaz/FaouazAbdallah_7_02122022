import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
// ---------------------
// import { applyMiddleware, createStore } from "redux";
// import thunk from "redux-thunk"; // thunk permet de faire des requettes asynch
// import { composeWithDevTools } from "redux-devtools-extension";
// import reducer from "./reducers/AuthReducers";
// ---------------------
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import store from "./store/ReducerStore";
import App from "./App";

// const store = createStore(
//   reducer, // on recupere tous les Reducers ensuite on voudra le :
//   composeWithDevTools(applyMiddleware(thunk)) // permet dacceder au store cest a dire au information donc a retiré le quand t'on veut mettre en ligne le site pou evité que les visiteur accèdent au store : cest comme demandé a facebook de laissé l'accés a leurs store
//   // composeWithDevTools(applyMiddleware(thunk,logger))
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        {/* toutes les routes vont vers app */}
      </Routes>
    </BrowserRouter>
  </Provider>
);

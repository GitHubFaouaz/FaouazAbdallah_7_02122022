import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth/SignUp";
import Login from "./pages/Auth/SignIn";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div className="App">
      {/* <Auth /> */}
      <Routes>
        {/* <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />} // s'il ya un user alors envoi le a la page home sinon a la page auth
        /> */}
        {/* <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />} //sur la page home s'il ya un user envoi le a la page Home sinon a la page Auth
        /> */}
        {/* <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />} // si tu es a la page auth quil ya un utilisateur alors envoi a la page homme sinon page auth
        /> */}
        <Route path="/Auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<Auth />} />

        {/* <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;

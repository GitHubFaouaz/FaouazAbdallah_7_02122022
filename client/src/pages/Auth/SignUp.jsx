import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/logo.png";
// import BouttonSignUp from "../../component/utils/BouttonSignUp";
import { sign_Up } from "../../action/AuthActions";
import SignIn from "./SignIn";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true); // sur true pour etre directement sur la page d'inscription
  const navigate = useNavigate();

  //  la data du formulaire
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    pseudo: "",
    email: "",
    password: "",
    confirmpass: "",
  });
  console.log(data);
  const dispatch = useDispatch();
  // const [confirmPass, setConfirmPass] = useState(true);

  // handle Change in input /on recupere l'information entré avec onChange avec la fonction handlechange
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value }); // il prend l'ensemble des valeur firsname Username password
  };

  // // Form Submission
  const handleSubmit = (e) => {
    // setConfirmPass(true);

    e.preventDefault();
    if (data.password === data.confirmpass) {
      // SI LES 2 password  identique envoi dans le store sinon  ...

      dispatch(sign_Up(data)) && setIsSignUp(false); //signUp du dossier action authAction
    } else {
      // setConfirmPass(false);// pour le front end
      console.log("mot passe incorrect");
      setIsSignUp(true);
      // dispatch(logIn(data)); // login du dossier action authAction
    }
  };

  const navigateLogin = () => {
    navigate("/Login");
  };

  return (
    <>
      {isSignUp ? (
        <div className="auth">
          <div className="colorBg"></div>
          <div className="colorBg"></div>
          <div className="colorBg"></div>

          <div className="containerForm">
            <div className=".containerLogo">
              <img src={logo} alt="logo" />

              <h1>TAWHID</h1>
            </div>

            <div className="box">
              <form className="form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="inputBox">
                  <input
                    type="text"
                    required="required"
                    name="firstname"
                    value={data.firstname}
                    onChange={handleChange}
                  />
                  <span>Firstname</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    required="required"
                    name="lastname"
                    value={data.lastname}
                    onChange={handleChange}
                  />
                  <span>Lastname</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    required="required"
                    name="pseudo"
                    value={data.pseudo}
                    onChange={handleChange}
                  />
                  <span>Pseudo</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    required="required"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  <span>Email</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    required="required"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                  <span>Password</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    required="required"
                    name="confirmpass"
                    value={data.confirmpass}
                    onChange={handleChange}
                  />
                  <span>Confirm Password</span>
                  <i></i>
                </div>

                <div className="square">
                  {/* <BouttonSignUp /> */}
                  <input type="submit" />
                </div>
                <div className="square">
                  <p className="NotAcount " onClick={navigateLogin}>
                    Don't have an account?
                  </p>
                </div>
                <div className="square"></div>

                <div className="square">erreur form</div>
                <div className="square"></div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        navigateLogin()
      )}
    </>
  );
}

export default SignUp;

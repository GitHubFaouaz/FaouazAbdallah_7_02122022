import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn() {
  const navigate = useNavigate();
  const navigateSignUp = () => {
    navigate("/Auth");
  };

  //  la data du formulaire
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value }); // il prend l'ensemble des valeur firsname Username password .... en mme taemps au lieu de faire 1 par 1 Username"Username
  };
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div id="body">
        <div class="divColor">
          <div class="color"></div>
          <div class="color"></div>
          <div class="color"></div>
          <div class="color"></div>
          <div class="color"></div>
          <div class="color"></div>
        </div>
        <div class="container">
          <div className=".containerLogo">
            <img src={logo} alt="logo" />

            <h1>TAWHID</h1>
          </div>
          <div class="drop">
            <div class="content">
              <h2>Sign in</h2>
              <form action="" onSubmit={handleSubmit}>
                <div class="inputBox">
                  <input
                    type="text"
                    name="Email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                  />
                </div>
                <div class="inputBox">
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                </div>
                <div class="inputBox">
                  <input type="submit" value="Login" />
                </div>
              </form>
            </div>
          </div>
          <a href="#" class="btns">
            Forgot <br />
            Password
          </a>
          <a href="#" class="btns signup" onClick={navigateSignUp}>
            Signup
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

import React from "react";
import logo from "../../img/logo.png"
const Auth = () => {
return( 
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
                  <div class="square" >
                        <p className="forget">Don't have an account?</p>
                        <a href="#"> Sign up</a>
                  </div>
                  <div className="square" >
                        <p className="forget">Forgot Password</p>
                         <a href="">Click Here</a>  
                  </div>
                  <div className="square"></div>
                  <div className="square"></div>
                  <div className="square">
                  <h2>Form</h2>
                  </div>
            
               <div className="form">
                  <h2>Sign Up</h2>
                 <div className="inputBox">
                  <input type="text" required="required" />
                  <span>Firstname</span>
                  <i></i>
                  </div>
                  <div className="inputBox">
                  <input type="text" required="required" />
                  <span>Lastname</span>
                  <i></i>
                  </div>
                  <div className="inputBox pseudo">
                  <input type="text" required="required" />
                  <span>Pseudo</span>
                  <i></i>
                  </div>
                  <div className="inputBox">
                  <input type="text" required="required" />
                  <span>Email</span>
                  <i></i>
                  </div>
                  <div className="inputBox">
                  <input type="text" required="required" />
                  <span>Password</span>
                  <i></i>
                  </div>
                  <div className="inputBox">
                  <input type="passeword" required="required" />
                  <span>Confirm Password</span>
                  <i></i>
                  </div>
                  <div className="link">
                 
                  </div>
                  <input type="submit" value="SignUp" />
                  </div>
            </div>

      </div>
</div>
)

}

export default Auth;
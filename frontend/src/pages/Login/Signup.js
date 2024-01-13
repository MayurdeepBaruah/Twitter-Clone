import React, { useState } from "react";
import twitterImage from "../../assets/Images/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import auth from "../../firebase.init";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Signup() {
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  //const [errormessage, seterrormessage] = useState("")
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleuser, googleloading, googleerror] =
    useSignInWithGoogle(auth);
  if (user || googleuser) {
    navigate("/");
    console.log(user);
    console.log(googleuser);
  }
  if (error) {
    console.log(error.message);
  }
  if (loading) {
    console.log("Loading...");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    createUserWithEmailAndPassword(email, password);

    const user = {
      username: username,
      name: name,
      email: email,
    }
    const { data }= axios.post("http://localhost:5000/register", user)
    console.log(data)
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  console.log(user);
  console.log(error);

  return (
    <div className="signup-container">
      <div className="image-container">
        <img className="image" src={twitterImage} alt="" />
      </div>
      <div className="form-container">
        <div className="form-box">
          <TwitterIcon className="Twittericon" style={{ color: "skyblue" }} />
          <h2 className="heading">Happening now</h2>
          <h3 className="heading1">Join twitter today</h3>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="@username"
              onChange={(e) => setusername(e.target.value)}
              className="display-name"
            />
            <input
              type="text"
              className="display-name"
              placeholder="Enter full name"
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="email"
              className="email"
              placeholder="Email address"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <div className="btn-login">
              <button type="submit" className="btn">
                SignUp
              </button>
            </div>
          </form>
          <hr />
          <div className="google-button">
            <GoogleButton
              className="g-btn"
              type="light"
              onClick={handleGoogleSignIn}
            />
          </div>
          <div>
            Already have an account ?
            <Link
              to={"/login"}
              style={{
                textdecoration: "none",
                color: "skyblue",
                fontWeight: "600",
                marginLeft: "5px",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

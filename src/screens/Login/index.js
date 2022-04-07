import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import showAlert from "../../components/snackBar/facet";
import "./index.css";

const LoginScreen = (props) => {
 
  useEffect(()=>{
    document.getElementsByClassName("commonHeaderContainer")[0].style.display = "none";
    return () => {
      document.getElementsByClassName("commonHeaderContainer")[0].style.display = "flex";
    }
  },[])

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  
  const validateUser = (e) => {
    e.preventDefault();
    if (username === "ivzuser" && password === "explore2022") {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", password);
      navigate("/customer")
    } else if (username === "ivzcsr" && password === "explore2022") {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", password);
      navigate("/csr")
    } 
    else if (username !== "ivzuser") {
      showAlert({
        text: "Invalid credentials!",
        bgColor: "#cb0f22",
      });
    } else if (password !== "explore2022") {
      showAlert({
        text: "Invalid password!",
        bgColor: "#cb0f22",
      });
    } else {
      showAlert({
        text: "Invalid credentials!",
        bgColor: "#cb0f22",
      });
    }
  };

  return (
    <div className="login-page-container">
      <form className="login-form" onSubmit={validateUser}>
        <img
          src={require("../../assets/images/user.png")}
          className="login-logo"
          alt="user-logo"
        />
        <h3 className="input-label">Username:</h3>
        <input
          className="input-fields"
          value={username}
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Enter username"
          required
        />
        <h3 className="input-label">Password:</h3>
        <input
          className="input-fields"
          value={password}
          autoComplete="true"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter password"
          required
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;

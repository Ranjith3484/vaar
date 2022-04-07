import React from "react";
import "./index.css";

function CommonHeader() {
  return (
    <div className="commonHeaderContainer">
      <img src={require("../../assets/images/v-logo.png")} alt="verizon" className="headerLogo"/>
    </div>
  );
}

export default CommonHeader;

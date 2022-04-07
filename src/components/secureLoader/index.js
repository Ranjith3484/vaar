import React from "react";
import "./index.css";

function SecureLoader() {
  return (
    <div className="loadingContainer" id="openLoadingScreen">
      <div>
        <h2 className="loadingHeader">Creating secure connection</h2>
        <div className="loadingContain">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default SecureLoader;

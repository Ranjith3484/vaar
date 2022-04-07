import React, { useState } from "react";
import CallerTabContent from "./callerTab";
import DeviceTabContent from "./deviceTab";
import "./index.css";

function SideNav(props) {
  const {selectedBrand,setSelectedBrand,selectedDevice,setSelectedDevice,selectedVariant, loadModel} = props;
  const [showSideNav,setShowSideNav] = useState(false);
  const [showingTab,setShowingTab] = useState("caller");

  return (
    <>
    <div className="sideNavOpenerContainer" onClick={()=>{setShowSideNav(true)}}>
       <h3 className="sideNavOpenText">Caller/Devices/Accessories</h3>
    </div>
    {showSideNav &&
    <div className="sideNavContainer">
      <div className="sideNavWrap">
      <div className="sideNavTabHeader">
           <h3 className={showingTab === "caller" ? "sideNavActiveTabHeaderText" : "sideNavTabHeaderText"} onClick={()=>{setShowingTab("caller")}}>Caller</h3>
           <h3 className={showingTab === "devices" ? "sideNavActiveTabHeaderText" : "sideNavTabHeaderText"} onClick={()=>{setShowingTab("devices")}}>Devices</h3>
           <h3 className={showingTab === "accessories" ? "sideNavActiveTabHeaderText" : "sideNavTabHeaderText"} onClick={()=>{setShowingTab("accessories")}}>Accessories</h3> 
           <img src={require("../../assets/images/customer/close.png")} className="sideNavCloseIcon"  onClick={()=>{setShowSideNav(false)}} alt="close"/>
      </div>
      {showingTab === "caller" && <CallerTabContent/>}
      {showingTab === "devices" && 
      <DeviceTabContent 
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
        selectedVariant={selectedVariant}
        showModel={loadModel}
      />}
      </div>
    </div>
    }
    </>
  );
}

export default SideNav;

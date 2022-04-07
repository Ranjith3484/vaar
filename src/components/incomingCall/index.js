import React, { useEffect, useState } from "react";
import "./index.css";

function IncomingCall(props) {
  const { acceptCall, declineCall } = props;
  const [callTimer,setCallTimer] = useState(59);

  //start the call timer
  useEffect(() => {
    if (callTimer > 0) {
      setTimeout(() => setCallTimer(callTimer - 1), 1000);
    } else {
      declineCall(false)
    }
  });

  useEffect(()=>{
    // clear timeout while unmounting the component
    return()=>{
      setCallTimer(0)
    }
  },[])

  // current time format
  function formatAMPM() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  return (
    <div className="incomingCallWrap" id="incomingCallModal">
      <div className="incomingCallContainer">
        <div className="callHeader">
           <img src={require("../../assets/images/v-logo.png")} className="incomingCallLogo" alt="icon"/>
           <div className="callHeaderNameRow">
                <p className="callHeaderName">VIKI</p>
                <p className="callHeaderTime">{formatAMPM()}</p>
           </div>
           <h3 className="callAlertText">Video Assist Alert</h3>
        </div>
        <div className="callContent">
          <h3 className="callContextH3">
            A customer is waiting to video chat. Are you ready to accept the
            call?
          </h3>
          <div className="callContextRow">
            <h3 className="callContextH3-Bold">Reason for Call: </h3>
            <h3 className="callContextH3">Inquire about new phones</h3>
          </div>
          <div className="callTimer" id="callTimer">00:{callTimer < 10 ? 0 : null}{callTimer}</div>
          <button className="acceptCallButton" onClick={acceptCall}>Accept Call</button>
          <button className="declineCallButton" onClick={()=>{declineCall(false)}}>Decline Call</button>
        </div>
      </div>
    </div>
  );
}

export default IncomingCall;

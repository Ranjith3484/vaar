import React, {useState} from "react";
import "./index.css";

function CustomerChatSection(props) {
const {sendData,name, endCall} = props;
const [micStatus,setMicStatus] = useState(true);
const [videoStatus,setVideoStatus] = useState(true);

var customerViewCustomerVideo = document.querySelector(
    "#customerViewCustomerVideoElement"
);
 
  // audio change
function audioChange() {
  const customerMediaStream = customerViewCustomerVideo.srcObject;
  const customerMediaTracks = customerMediaStream.getTracks();

  if (micStatus) {
    //mute mic
    setMicStatus(false)
    //send message via drone for audio muted
    sendData("audioMuted")
    //remove audio track
    customerMediaTracks.forEach(function (device) {
      if (device.kind === "audio") {
        device.enabled = false;
      }
    });
  } else {
    //un mute mic
    setMicStatus(true)
    //send message via drone for audio un muted
    sendData("audioUnMuted")
    //add audio track
    customerMediaTracks.forEach(function (device) {
      if (device.kind === "audio") {
        device.enabled = true;
      }
    });
  }
}

//video change
function videoChange() {
  const customerMediaStream = customerViewCustomerVideo.srcObject;
  const customerMediaTracks = customerMediaStream.getTracks();
  //send message via drone for video mute/unmute
   sendData("videoViewChange")
  if (videoStatus) {
    //mute video
    setVideoStatus(false)
    document.getElementById("customerViewCustomerVideoElement").style.display = "none";
    document.getElementsByClassName("miniViewGradientContainer")[0].style.display = "inline-block";

    //stop video track
    customerMediaTracks.forEach(function (device) {
      if (device.kind === "video") {
        device.enabled = false;
      }
    });
  } else {
    //un mute video
    setVideoStatus(true);
    document.getElementById("customerViewCustomerVideoElement").style.display ="";
      document.getElementsByClassName("miniViewGradientContainer")[0].style.display = "none";

    //add video track
    customerMediaTracks.forEach(function (device) {
      if (device.kind === "video") {
        device.enabled = true;
      }
    });
  }
}

const micIcon = micStatus ? require("../../assets/images/customer/mic_on.png") : require("../../assets/images/customer/mic_off.png");
const videoIcon = videoStatus ? require("../../assets/images/customer/video_on.png") : require("../../assets/images/customer/video_off.png");

  return (
    <div className="customerViewContainer" id="customerViewContainer">
    {/* remote audio status */}
    <div className="CSRremoteAudioStatus">
       <img src={require("../../assets/images/customer/mic-green.png")} className="CSRremoteAudioUnMutedIcon" alt="mic status"/>
       <img src={require("../../assets/images/customer/mic-off-red.png")} className="CSRremoteAudioMutedIcon" alt="mic off status"/>
    </div>
       {/* remote stream */}
       <video autoPlay={true} id="customerViewClientVideoElement"></video>
       {/* controls */}
       <div className="customerControlsRow">
         <img src={micIcon} className="control-icon" alt="mic" onClick={()=>{audioChange()}}/>
         <img src={videoIcon} className="control-icon" alt="video" onClick={()=>{videoChange()}}/>
         <img src={require("../../assets/images/customer/end-call.png")} className="control-icon" alt="mic" onClick={()=>{endCall()}}/>
       </div>
       {/* self stream */}
       <div className="customerViewCustomerContainer">
        <video autoPlay={true} id="customerViewCustomerVideoElement" muted></video>
        <div id="imageElement" className="miniViewGradientContainer">
          <img
            src={require("../../assets/images/customer/unknown-person.png")}
            className="customerViewCustomerImage"
            alt="unknown-user"
          />
        </div>
        <div className="miniViewStatusContainer">
           <div className="overlayName">{name}</div>
           {!micStatus &&  <img src={require("../../assets/images/customer/mic-off-white.png")} className="miniViewStatusIcon" alt='icon'/>}
        </div>
      </div>
    </div>
  );
}

export default CustomerChatSection;

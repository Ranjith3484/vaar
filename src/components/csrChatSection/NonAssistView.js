import React from 'react';

function NonAssistView(props) {
    const {initialView,micStatus} = props;
    return ( 
    <>
   {/* remote stream  large view initial */}
      <video id="csrLargeVideoInitialRemote" autoPlay={true} muted style={{visibility:initialView ? "" : "hidden"}}></video>
       <div className="csrLargeImageInitialRemoteContainer"
            style={{visibility:initialView ? "" : "hidden"}}>
         <img
            src={require("../../assets/images/customer/unknown-person.png")}
            className="csrLargeImageInitialRemote"
            alt="unknown-user"
         />
       </div>
    {/* remote audio status initial */}
        <div className="customerRemoteAudioStatus" style={{visibility:initialView ? "" : "hidden"}}>
          <div id="nonAssistViewCustomerName" style={{visibility:initialView ? "" : "hidden"}}></div>
           <img src={require("../../assets/images/customer/mic-green.png")} className="customerRemoteAudioUnMutedIcon" alt="mic status"/>
           <img src={require("../../assets/images/customer/mic-off-red.png")} className="customerRemoteAudioMutedIcon" alt="mic off status"/>
        </div>
 
    {/* local stream mini view initial */}
      <div className="csrViewCustomerContainer" style={{visibility:initialView ? "" : "hidden"}}>
        <video id="initialCsrViewLocalStream" muted autoPlay={true}></video>
        <div className="miniViewStatusContainer">
           <div className="overlayName" id="overlayName-csrView">CSR</div>
            <img src={require("../../assets/images/customer/mic-off-white.png")} style={{display: micStatus ? "none" : ""}} className="initialMiniViewStatusIcon-csrView" alt='icon'/>
        </div>
      </div>
    </>
     );
}

export default NonAssistView;
import React from 'react';

function AssistView(props) {
    const {initialView} = props;
    return (
    <>
         {/* local stream large view*/}
        <canvas id="canvasModel" className="canvasModel" style={{visibility:initialView ? "hidden" : ""}}></canvas>
         {/* remote stream mini view*/}
        <div className="csrViewCustomerContainer" style={{visibility:initialView ? "hidden" : ""}}>
            <video autoPlay={true} id="csrViewCustomerVideoElement"></video>
            <div id="imageElement" className="csrMiniViewGradientContainer">
              <img
               src={require("../../assets/images/customer/unknown-person.png")}
               className="csrViewCustomerImage"
               alt="unknown-user"
              />
            </div>
           <div className="miniViewStatusContainer">
             <div className="overlayName" id="overlayName-csrView"></div>
             <img src={require("../../assets/images/customer/mic-off-white.png")} className="miniViewStatusIcon-csrView" alt='icon'/>
            </div>
        </div>
    </>
      );
}

export default AssistView;
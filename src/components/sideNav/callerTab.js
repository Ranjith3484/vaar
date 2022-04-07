import React from 'react';

function CallerTabContent() {
    return ( 
        <div className="callerTabContainer">
         <div className="callerTabWrap">
          <div className="callerTabList">
            <h3 className="callerTabHeader">Verizon Customer</h3>
            <h3 className="callerTabPara">Since December 2005</h3>
          </div>
          <div className="callerTabList">
            <h3 className="callerTabHeader">Customer Rating</h3>
              <div className="callerRatingRow">
                  <img src={require("../../assets/images/customer/star-fill.png")} className="callerRatingIcon" alt="rating"/>
                  <img src={require("../../assets/images/customer/star-fill.png")} className="callerRatingIcon" alt="rating"/>
                  <img src={require("../../assets/images/customer/star-fill.png")} className="callerRatingIcon" alt="rating"/>
                  <img src={require("../../assets/images/customer/star-fill.png")} className="callerRatingIcon" alt="rating"/>
                  <img src={require("../../assets/images/customer/star-unfill.png")} className="callerRatingIcon" alt="rating"/>
                </div>
          </div>
          <div className="callerTabList">
            <h3 className="callerTabHeader">Devices</h3>
            <h3 className="callerTabPara">iPhone 6,Apple Watch</h3>
          </div>
          <div className="callerTabList">
            <h3 className="callerTabHeader">Last Call</h3>
            <h3 className="callerTabPara">14 January 2021</h3>
          </div>
          <div className="callerTabList">
            <h3 className="callerTabHeader">Reason</h3>
            <h3 className="callerTabPara">Internet not working. Fixed by CSR James Ralston</h3>
          </div>
         </div>

          <div className="callerDevicesContent">
            <h3 className="callerDevicesText">Caller Devices</h3>
            <div className="callerDevicesRow">
            <div className="callerDeviceColumn">
                  <img
                    src={require("../../assets/images/iPhone6.jpeg")}
                    className="callerDeviceImage"
                    alt="user device"
                  />
                  <h6 className="callerDeviceName">iPhone6</h6>
                </div>
                <div className="callerDeviceColumn">
                  <img
                    src={require("../../assets/images/appleWatch.png")}
                    className="callerDeviceImage"
                    alt="user device"
                  />
                  <h6 className="callerDeviceName">Apple Watch</h6>
                </div>
            </div>
          </div>
         </div>
     );
}

export default CallerTabContent;
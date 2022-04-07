import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function CommonLandingUI(props) {
  const { customer } = props;
  const navigate = useNavigate("");

  return (
    <>
      {/* banner section */}
      <div className="landingscreenRow">
        <div className="landingscreenColumn">
          <img
            className="introImage"
            src={require("../../assets/images/landing/banner-1.png")}
            alt="banner-1"
          />
        </div>
        <div className="landingscreenColumn">
          <img
            className="introImage"
            src={require("../../assets/images/landing/banner-2.png")}
            alt="banner-2"
          />
        </div>
      </div>
      {/* details section */}
      <div className="landingscreenRow">
        {/* <!-- address column --> */}
        <div className="landingscreenOuterColumn grey">
          <div className="addSpace"></div>
          <div className="landingscreenContainer">
            <h5>Verizon Company Store</h5>
            <div className="spaceBetween">
              <h1>Wauwatosa</h1>
              <img
                src={require("../../assets/images/landing/fav-unfilled.svg")}
                className="customIcons"
                alt="fav"
              />
            </div>
            <div className="addSpace"></div>
            <h5>11415W Burleigh St,</h5>
            <h5>Suite 101,</h5>
            <h5>Wauwatosa, WI,</h5>
            <h5>53222</h5>
            <div className="addSpace"></div>
            <u>Change location</u>
            <div className="addSpace30"></div>
            {customer ? (
              <div
                onClick={() => {
                 navigate("/customer/chat")
                }}
                style={{ cursor: "pointer", display: "flex" }}
              >
                <img
                  src={require("../../assets/images/landing/video-camera.png")}
                  className="customIcons"
                  alt="camera"
                  style={{height:"16px",marginRight:"5px"}}
                />
                <u
                  style={{
                    fontWeight: "bold",
                    paddingLeft: "5px",
                    fontFamily: "verizonBoldFont",
                    fontStyle: "normal",
                  }}
                >
                  Start a video call with in-store rep
                </u>
              </div>
            ) : null}
            <div className="addSpace"></div>
            <table className="landingTable">
                 <tbody>
                 <tr>
                  <th>
                      <h5>Today:</h5>
                  </th>
                  <th>
                     <h5>Open until 7 PM</h5>
                  </th>
                </tr>
                <tr style={{height:"8px"}}></tr>
                <tr>
                  <th>
                      <h5>Tomorrow:</h5>
                  </th>
                  <th>
                     <h5 style={{textAlign:'left'}}>11 AM - 7 PM</h5>
                  </th>
                </tr>
                 </tbody>
            </table>
            <div className="addSpace"></div>
            <u>See More</u>
            <div className="addSpace"></div>
            <hr></hr>
            <div className="block">
              <svg className="customSVG">
                <path d="M12.375,2.25H0V13.5h1.125c0,1.243,1.007,2.25,2.25,2.25s2.25-1.007,2.25-2.25h6.75c0,1.243,1.007,2.25,2.25,2.25s2.25-1.007,2.25-2.25H18V9L12.375,2.25z M3.375,14.625c-0.62,0-1.125-0.505-1.125-1.125c0-0.62,0.505-1.125,1.125-1.125S4.5,12.88,4.5,13.5C4.5,14.12,3.995,14.625,3.375,14.625z M14.625,14.625c-0.62,0-1.125-0.505-1.125-1.125c0-0.62,0.505-1.125,1.125-1.125S15.75,12.88,15.75,13.5C15.75,14.12,15.245,14.625,14.625,14.625z M16.875,12.375h-0.312c-0.39-0.67-1.107-1.125-1.938-1.125s-1.548,0.455-1.938,1.125H5.313c-0.39-0.67-1.107-1.125-1.938-1.125s-1.548,0.455-1.938,1.125H1.125v-9h10.723l5.027,6.032V12.375z"></path>
              </svg>
              Curbside Pickup
             <img
                src={require("../../assets/images/landing/check.png")}
                className="customIcons"
                alt="check"
                style={{marginLeft:"5px"}}
              />
            </div>
            <div className="block">
              <svg className="customSVG">
                <path fill="#020303" d="M11.354 13.875H.838v-8.99h1.845v1.45h.839v-1.45h5.15v1.45h.837v-1.45h1.845v8.99zM3.522 3.285c0-.794.641-1.439 1.433-1.447h2.283c.791.008 1.433.653 1.433 1.446v.763h-5.15v-.763zm7.14.762H9.51v-.763A2.285 2.285 0 0 0 7.24 1H4.954a2.285 2.285 0 0 0-2.272 2.284v.763H0v10.667h12.192V4.047h-1.53z"></path>
              </svg>
              In-Store Pickup
             <img
                src={require("../../assets/images/landing/check.png")}
                className="customIcons"
                alt="check"
                style={{marginLeft:"5px"}}
              />
            </div>
            <p style={{ paddingTop: "5px", color: "black" }}>
              Normally available for pickup within an hour
            </p>
            <div className="addSpace"></div>
            <div className="ratingRowLanding">
              <i className="ratingText">Rating: </i>
              <img
                src={require("../../assets/images/landing/home-star-fill.png")}
                className="customIcons"
                alt="star"
              />
              <img
                src={require("../../assets/images/landing/home-star-fill.png")}
                className="customIcons"
                alt="star"
              />
              <img
                src={require("../../assets/images/landing/home-star-fill.png")}
                className="customIcons"
                alt="star"
              />
              <img
                src={require("../../assets/images/landing/home-star-unfill.png")}
                className="customIcons"
                alt="star"
              />
              <img
                src={require("../../assets/images/landing/home-star-unfill.png")}
                className="customIcons"
                alt="star"
              />
            </div>
            <u style={{ float: "right" }}>Reviews (53)</u>
            <br />
            <u style={{marginLeft:"10px"}}>Leave a review</u>
          </div>
        </div>
        {/* <!-- googel map column --> */}
        <div className="landingscreenInnerColumn">
          <div className="mapContainer">
            <img
              src={require("../../assets/images/landing/googleMap.png")}
              className="googleMapImage"
              alt="googleMap"
            />
          </div>
        </div>
        {/* <!-- other links column --> */}
        <div className="landingscreenOuterColumn">
          <div className="landingscreenContainer">
            <div className="block" style={{ marginBottom: "10px" }}>
              <img
                src={require("../../assets/images/landing/truck.png")}
                className="customIconTruck"
                alt="truck"
              />
              <u className="iconAlignedText">Get directions</u>
            </div>
            <div className="block" style={{ marginBottom: "10px" }}>
              <svg className="customSVG">
                <path d="M10.75,13.27c0-.9-.68-1.37-1.87-1.37H8.44v-.67h.43c1.11,0,1.67-.47,1.67-1.22S9.85,8.76,9,8.76a1.54,1.54,0,0,0-1.64,1.65H6.52A2.27,2.27,0,0,1,9,8.08c1.31,0,2.36.72,2.36,1.95a1.52,1.52,0,0,1-1.17,1.49v0a1.72,1.72,0,0,1,1.43,1.81c0,1.35-1.11,2.13-2.55,2.13A2.54,2.54,0,0,1,6.28,13h.86a1.72,1.72,0,0,0,1.93,1.77C10.05,14.76,10.75,14.28,10.75,13.27Zm3.38,2.06H15V8.21h-.67c-.13,1-.88,1.36-1.75,1.38v.58h1.55Zm4.17-12v15H3.3V3.3ZM17.17,6.56H4.42V17.17H17.17Zm0-2.14H4.42v1H17.17Z"></path>
              </svg>
              <u className="iconAlignedText">Schedule an appointment</u>
            </div>
            <div className="block">
              <svg className="customSVG">
                <path d="M10.75,13.27c0-.9-.68-1.37-1.87-1.37H8.44v-.67h.43c1.11,0,1.67-.47,1.67-1.22S9.85,8.76,9,8.76a1.54,1.54,0,0,0-1.64,1.65H6.52A2.27,2.27,0,0,1,9,8.08c1.31,0,2.36.72,2.36,1.95a1.52,1.52,0,0,1-1.17,1.49v0a1.72,1.72,0,0,1,1.43,1.81c0,1.35-1.11,2.13-2.55,2.13A2.54,2.54,0,0,1,6.28,13h.86a1.72,1.72,0,0,0,1.93,1.77C10.05,14.76,10.75,14.28,10.75,13.27Zm3.38,2.06H15V8.21h-.67c-.13,1-.88,1.36-1.75,1.38v.58h1.55Zm4.17-12v15H3.3V3.3ZM17.17,6.56H4.42V17.17H17.17Zm0-2.14H4.42v1H17.17Z"></path>
              </svg>
              <u className="iconAlignedText">
                Request a business sales appointment
              </u>
            </div>
            <div className="addSpace"></div>
            <h5>
              By clicking on the link above, you represent that neither you nor
              anyone in your household have COVID19 or its symptoms (e.g. fever,
              cough, shortness of breath) or are being quarantined for suspected
              exposure to the virus.
            </h5>
            <br />
            <h5>
              Occupancy limits may apply. You may need to wait outside or in
              your vehicle before going in. Non-vaccinated customers and
              employees are required to use a mask when visiting our stores.
              Please note: Verizon follows state and local requirements
              regarding mask use. You may be required to wear a mask even if you
              are fully vaccinated.
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommonLandingUI;

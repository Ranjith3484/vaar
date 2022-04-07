const { setIncomingCall } = require("../../redux/actions");
const store = require("../../redux/store");
const action = store.store;
const CLIENT_ID = "LT31hadz55oFVVvT";

const drone = new window.Scaledrone(CLIENT_ID, {
  data: {
    name: "CSR",
  },
});


const InitializingAPICSR = () => {
  //scale drone api for passing messages (audio/video - mute/unmute , customer info)
  drone.on("open", (error) => {
    if (error) {
      return console.error(error);
    }
    console.log("Successfully connected to Scaledrone");
  
    const room = drone.subscribe("observable-room");
    room.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      console.log("Successfully joined room");
    });
  
    room.on("data", (text, member) => {
      if (member.clientData.name === "customer") {
        //check message only from customer
        if (text === "videoViewChange") {
          //check for video change
          if (
            document.getElementById("csrViewCustomerVideoElement").style.display ===
            "none"
          ) {
            //assist view - show video/hide image
            document.getElementById("csrViewCustomerVideoElement").style.display =
              "block";
            document.getElementsByClassName("csrMiniViewGradientContainer")[0].style.display =
              "none";
              //non assist view - show video/hide image
            document.getElementsByClassName("csrLargeImageInitialRemoteContainer")[0].style.display = "none"
              
          } else {
             //assist view - hide video/show image
            document.getElementById("csrViewCustomerVideoElement").style.display =
              "none";
            document.getElementsByClassName("csrMiniViewGradientContainer")[0].style.display =
              "inline-block";

               //non assist view - hide video/show image
              document.getElementsByClassName("csrLargeImageInitialRemoteContainer")[0].style.display = ""
          }
        } else if (text === "audioMuted") {
          console.log("muted");
          //assist view - show muted icon
          document.getElementsByClassName("miniViewStatusIcon-csrView")[0].style.display = "block";

           //non assist view - show muted/ hide unmuted icons
          document.getElementsByClassName(
            "customerRemoteAudioMutedIcon"
          )[0].style.display = "block";
          document.getElementsByClassName(
            "customerRemoteAudioUnMutedIcon"
          )[0].style.display = "none";
        } else if (text === "audioUnMuted") {
          console.log("un muted");
           //assist view  - hide muted icon
          document.getElementsByClassName("miniViewStatusIcon-csrView")[0].style.display ="none";

           //non assist view - hide muted/ show unmuted icons
          document.getElementsByClassName(
            "customerRemoteAudioMutedIcon"
          )[0].style.display = "none";
          document.getElementsByClassName(
            "customerRemoteAudioUnMutedIcon"
          )[0].style.display = "block";
        } else if(text === "incomingCall"){
          console.log('incoming call');
          // dispatch action for call popup
          action.dispatch(setIncomingCall(true))
        }
        else {
          console.log(text)
          //add the customer name
          document.getElementById("overlayName-csrView").innerHTML = text.name;
          document.getElementById("nonAssistViewCustomerName").innerHTML = text.name;
        }
      }
    });
  });
  
  drone.on("close", (event) => {
    console.log("Connection was closed", event);
  });
  
  drone.on("error", (error) => {
    console.error(error);
  });
};

const PublishMessageCSR = (data)=>{
    drone.publish({
          room: "observable-room",
          message: data
    });
}

module.exports = {
    InitializingAPICSR: InitializingAPICSR,
    PublishMessageCSR: PublishMessageCSR,
};
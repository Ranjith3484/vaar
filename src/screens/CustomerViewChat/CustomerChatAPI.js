const CLIENT_ID = "LT31hadz55oFVVvT";

const drone = new window.Scaledrone(CLIENT_ID, {
  data: {
    name: "customer",
  },
});


const InitializingAPICustomer = () => {
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
      console.log(text, "received message from " + member.clientData.name);
      if (member.clientData.name === "CSR") {
        if (text === "audioMuted") {
          console.log("muted");
          document.getElementsByClassName(
            "CSRremoteAudioMutedIcon"
          )[0].style.display = "block";
          document.getElementsByClassName(
            "CSRremoteAudioUnMutedIcon"
          )[0].style.display = "none";
        } else if (text === "audioUnMuted") {
          console.log("un muted");
          document.getElementsByClassName(
            "CSRremoteAudioMutedIcon"
          )[0].style.display = "none";
          document.getElementsByClassName(
            "CSRremoteAudioUnMutedIcon"
          )[0].style.display = "block";
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

const PublishMessageCustomer = (data)=>{
    drone.publish({
          room: "observable-room",
          message: data
    });
}

module.exports = {
    InitializingAPICustomer: InitializingAPICustomer,
    PublishMessageCustomer: PublishMessageCustomer,
};
import React, { useEffect, useState } from "react";
import CsrChatSection from "../../components/csrChatSection";
import FeaturesHolder from "../../components/featuresHolder";
import SideNav from "../../components/sideNav";
import { PublishMessageCSR } from "./CSRChatAPI";
import { useNavigate } from "react-router-dom";
import { disposeScene } from "../../components/utilities/DevicePosition";
import { animateModel } from "../../components/csrChatSection/index";
import { setModel } from "../../components/csrChatSection/index";
var isUnbox = false;

function CsrViewChatScreen() {
  const [showFeaturesOpener,setShowFeaturesOpener] = useState(false);
  const [selectedBrand,setSelectedBrand] = useState(null);
  const [selectedDevice,setSelectedDevice] = useState(null);
  const [selectedVariant,setSelectedVariant] = useState(null);
  const [micStatus,setMicStatus] = useState(true);
  const [initialView,setInitialView] = useState(true);
  const [persistModel,setPersisitModel] = useState(false);
  const [deviceUnboxPath,setDeviceUnboxPath] = useState(null);
  const [selectedFeaturesTab,setSelectedFeaturesTab] = useState("views");

  const navigate = useNavigate();

  useEffect(() => {
      startCallSession()
  }, []);

  const showModel =(val)=>{
      disposeScene();
      setInitialView(false)
      setShowFeaturesOpener(true);
      if(val.model){
       setSelectedVariant(val.path);
       setPersisitModel(val.persist)
       //setModel();
      }else{
        isUnbox = true;
        console.log(selectedDevice.unbox)
        if(selectedDevice.unbox){
          console.log("Setting Path Unbox Model")
          setDeviceUnboxPath(selectedDevice.unbox)
          animateModel();
        }else{
          alert("Unbox 3D Model not found.")
        }
      }
  }
  const resetUnbox=()=>{
    disposeScene();
    if(isUnbox){
      isUnbox = false;
      setModel();
    }
}


  const showFeature = (type)=>{
    console.log("show feature",type)
  }

  function startCallSession() {
    //webrtc starts here

    const MESSAGE_TYPE = {
      SDP: "SDP",
      CANDIDATE: "CANDIDATE",
    };

    const END_OF_FILE_MESSAGE = "EOF";
    let code = 123456789121;
    let peerConnection;
    let signaling;
    const senders = [];

    const startChat = async () => {
      try {
        var canvas = document.getElementById("canvasModel");
        let userMediaStream = canvas.captureStream(30);
          navigator.mediaDevices
          .getUserMedia({
            audio: true
          })
          .then((audioStream) => {
            audioStream.getAudioTracks().forEach((track) => {
              userMediaStream.addTrack(track);
            });
            console.log("canv source: ", userMediaStream.getAudioTracks()); // prints  []
          });

        signaling = new WebSocket("wss://videochat-app-bj.herokuapp.com");

        setTimeout(function () {
          peerConnection = createPeerConnection();
          addMessageHandler();
          var canvas = document.getElementById("canvasModel");
          let userMediaStream = canvas.captureStream(30);
          navigator.mediaDevices
            .getUserMedia({
              audio: true,
            })
            .then((audioStream) => {
              audioStream.getAudioTracks().forEach((track) => {
                userMediaStream.addTrack(track);
              });
              userMediaStream
                .getTracks()
                .forEach((track) =>
                  senders.push(peerConnection.addTrack(track, userMediaStream))
                );
                //add local stream to mini view (non assist view)
                document.getElementById("initialCsrViewLocalStream").srcObject = userMediaStream;
               document.getElementById("csr-control-mic-mute").addEventListener("click", function() {
                  muteAudio(userMediaStream);
               });
               //event listener for  mic unmute
               document.getElementById("csr-control-mic-unmute").addEventListener("click", function() {
                UnMuteAudio(userMediaStream);
             });
            });
        }, 10000);
      } catch (err) {
        console.error(err);
      }
    };

    startChat();

    const createPeerConnection = () => {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      pc.onnegotiationneeded = async () => {
        await createAndSendOffer();
      };

      pc.onicecandidate = (iceEvent) => {
        if (iceEvent && iceEvent.candidate) {
          sendMessage({
            message_type: MESSAGE_TYPE.CANDIDATE,
            content: iceEvent.candidate,
          });
        }
      };

      pc.ontrack = (event) => {
        //add remote stream to mini view (assist view)
        const video = document.getElementById("csrViewCustomerVideoElement");
        video.srcObject = event.streams[0];

        //add remote stream to large view (non assist view)
        const NonAssistVideo = document.getElementById("csrLargeVideoInitialRemote");
        NonAssistVideo.srcObject = event.streams[0];

        console.log("live streaming--->");

      };

      pc.ondatachannel = (event) => {
        const { channel } = event;
        channel.binaryType = "arraybuffer";

        const receivedBuffers = [];
        channel.onmessage = async (event) => {
          const { data } = event;
          try {
            if (data !== END_OF_FILE_MESSAGE) {
              receivedBuffers.push(data);
            } else {
              const arrayBuffer = receivedBuffers.reduce((acc, arrayBuffer) => {
                const tmp = new Uint8Array(
                  acc.byteLength + arrayBuffer.byteLength
                );
                tmp.set(new Uint8Array(acc), 0);
                tmp.set(new Uint8Array(arrayBuffer), acc.byteLength);
                return tmp;
              }, new Uint8Array());
              // eslint-disable-next-line
              const blob = new Blob([arrayBuffer]);
              // downloadFile(blob, channel.label);
              channel.close();
            }
          } catch (err) {
            console.log("File transfer failed");
          }
        };
      };

      pc.onconnectionstatechange = function (event) {
        switch (pc.connectionState) {
          default:
          case "connected":
            document.getElementsByClassName("csrLargeImageInitialRemoteContainer")[0].style.display = "none"
            break;
          case "disconnected":
          case "failed":
             endCall();
            break;
          case "closed":
             endCall();
            break;
        }
      };

      return pc;
    };

    const addMessageHandler = () => {
      signaling.onmessage = async (message) => {
        const data = JSON.parse(message.data);
        if (!data) {
          return;
        }
        const { message_type, content } = data;
        try {
          if (message_type === MESSAGE_TYPE.CANDIDATE && content) {
            await peerConnection.addIceCandidate(content);
          } else if (message_type === MESSAGE_TYPE.SDP) {
            if (content.type === "offer") {
              await peerConnection.setRemoteDescription(content);
              const answer = await peerConnection.createAnswer();
              await peerConnection.setLocalDescription(answer);
              sendMessage({
                message_type: MESSAGE_TYPE.SDP,
                content: answer,
              });
            } else if (content.type === "answer") {
              await peerConnection.setRemoteDescription(content);
            } else {
              console.log("Unsupported SDP type.");
            }
          }
        } catch (err) {
          console.error(err);
        }
      };
    };

    const sendMessage = (message) => {
      signaling.send(
        JSON.stringify({
          ...message,
          code,
        })
      );
    };

    const createAndSendOffer = async () => {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      sendMessage({
        message_type: MESSAGE_TYPE.SDP,
        content: offer,
      });
    };

    //webrtc ends here
  }

  function muteAudio (userMediaStream){
    const mediaTracks = userMediaStream.getTracks();
      //mute mic
      setMicStatus(false)
      //send message via drone for audio muted
      PublishMessageCSR("audioMuted")
      //remove audio track
      mediaTracks.forEach(function (device) {
        if (device.kind === "audio") {
          device.enabled = false;
        }
      });

  }

  function UnMuteAudio (userMediaStream){
    const mediaTracks = userMediaStream.getTracks();
      //un mute mic
      setMicStatus(true)
      //send message via drone for audio un muted
      PublishMessageCSR("audioUnMuted")
      //add audio track
      mediaTracks.forEach(function (device) {
        if (device.kind === "audio") {
          device.enabled = true;
        }
      });
  }

  function endCall(){
     navigate("/csr");
     window.location.reload();
  }

  return (
    <>
      <CsrChatSection
        micStatus={micStatus}
        endCall={endCall}
        selectedVariant={selectedVariant}
        initialView={initialView}
        persistModel={persistModel}
        deviceUnboxPath={deviceUnboxPath}
        selectedFeaturesTab = {selectedFeaturesTab}
      />
      <SideNav
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
        selectedVariant={selectedVariant}
        loadModel={showModel}
      />
      {showFeaturesOpener && (
        <FeaturesHolder
          loadModel={showModel}
          showFeature={showFeature}
          resetUnbox={resetUnbox}
          selectedFeaturesTab = {selectedFeaturesTab}
          setSelectedFeaturesTab = {setSelectedFeaturesTab}
        />
      )}
    </>
  );
}

export default CsrViewChatScreen;

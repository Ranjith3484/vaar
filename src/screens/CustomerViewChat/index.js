import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerChatSection from "../../components/customerChatSection";
import SecureLoader from "../../components/secureLoader";
import VideoCallForm from "../../components/videoCallForm";
import {
  InitializingAPICustomer,
  PublishMessageCustomer,
} from "./CustomerChatAPI";

function CustomerViewChatScreen() {
  const [videoCallForm, setVideoCallForm] = useState(true);
  const [createConnection, setCreateConnection] = useState(false);
  const [connectionEstablished, setConnectionEstablished] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    InitializingAPICustomer();
  }, []);

  //submit the form
  const submitForm = async (name, phone, reason) => {
    //send message to csr
    await PublishMessageCustomer("incomingCall");
    await setVideoCallForm(false);
    await setConnectionEstablished(true);
    await setCreateConnection(true);
    document.getElementsByClassName(
      "customerViewContainer"
    )[0].style.visibility = "hidden";
    await initiateCall(name, phone, reason);
    setName(name);
  };

  const initiateCall = (name, phone, reason) => {
    const MESSAGE_TYPE = {
      SDP: "SDP",
      CANDIDATE: "CANDIDATE",
    };

    const END_OF_FILE_MESSAGE = "EOF";
    let code = 123456789121;
    let peerConnection;
    let signaling;
    const senders = [];
    let userMediaStream;

    const startChat = async () => {
      try {
        userMediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        signaling = new WebSocket("wss://videochat-app-bj.herokuapp.com");
        setTimeout(function() {
          peerConnection = createPeerConnection();

          addMessageHandler();

          userMediaStream
            .getTracks()
            .forEach((track) =>
              senders.push(peerConnection.addTrack(track, userMediaStream))
            );

          document.getElementById(
            "customerViewCustomerVideoElement"
          ).srcObject = userMediaStream;
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
        const video = document.getElementById("customerViewClientVideoElement");
        video.srcObject = event.streams[0];
        console.log("live streaming");
        //send message for customer name
        PublishMessageCustomer({
          name: name,
          contact: phone,
          reason: reason,
        });
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

      pc.onconnectionstatechange = function(event) {
        switch (pc.connectionState) {
          default:
          case "connected":
            //close the loading screen
            setCreateConnection(false);
            document.getElementsByClassName(
              "customerViewContainer"
            )[0].style.visibility = "";
            break;
          case "disconnected":
          case "failed":
            endVideoCall();
            break;
          case "closed":
            endVideoCall();
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
  };

  const endVideoCall = () => {
    navigate("/customer");
    window.location.reload();
  };


  useEffect(()=>{
    // disable scrollig in create connection screen
    const contentBody = document.getElementsByClassName("bodyContent")[0];
    if(createConnection){
      contentBody.style.overflow = "hidden";
    }else{
      contentBody.style.overflow = "auto";
    }
  },[createConnection])

  return(
    <>
      {videoCallForm && <VideoCallForm sendFormData={submitForm} />}
      {createConnection && <SecureLoader />}
      {connectionEstablished && <CustomerChatSection endCall={endVideoCall} sendData={PublishMessageCustomer} name={name}/>}
    </>
  );
}

export default CustomerViewChatScreen;

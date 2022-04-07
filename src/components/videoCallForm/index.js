import React,{useEffect, useState} from "react";
import "./index.css";
import showAlert from "../../components/snackBar/facet";

function VideoCallForm(props) {
  const {sendFormData} = props;
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [showOptions,setShowOptions] = useState(false);
  const [reason,setReason] = useState('Select');
  const [buttonDisabled,setButtonDisabled] = useState(true);

  const options =["Service is needed","Know about sale","Inquire about new phone","Store location","iPhone 13 specification","Others"]

  const submitForm =(e)=>{
    e.preventDefault();
    if(reason === "Select"){
      showAlert({
        text: "Select a reason",
        bgColor: "#cb0f22",
      })
    }else{
       sendFormData(name,phone,reason);
    }
  }

  useEffect(()=>{
    if(name !== "" && phone !== "" && reason !== "Select"){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[name,phone,reason])

  const changeReason =(val)=>{
     setReason(val)
     setShowOptions(false)
  }

  return (
    <div className="openVideoCallForm" id="openVideoCallForm">
       <div className="openVideoCallFormInnerContainer">
       <h1
          className="callFormHeader"
        >
          Reach us here!
        </h1>
        <h4>
          Want to talk with us? We're always happy to listen. Here's how you can
          reach us
        </h4>
        <hr className="thickBorder"></hr>
        <form onSubmit={submitForm}>
        <p className="inputLabel">Your name</p>
        <input
            className="form-input"
            value={name}
            placeholder="Your name"
            required
            id="callRequesterName"
            onChange={(e)=>{setName(e.target.value)}}
          />
          <p className="inputLabel">Call back number</p>
          <input
            className="form-input"
            type="number"
            value={phone}
            placeholder="Contact number"
            required
            id="callRequesterNumber"
            maxLength={13}
            minLength={10}
            onChange={(e)=>{setPhone(e.target.value)}}
          />
          <p className="inputLabel">Reason for video call</p>
          <div className="selectWrap">
          <div className="selectContainer" onClick={()=>{setShowOptions(!showOptions)}}>
             <h4 className="selectText">{reason}</h4>
             <img src={require("../../assets/images/customer/down-caret.png")} className="selectIcon" alt="icon"/>
          </div>
          {
            showOptions &&
            <div className="optionsContainer">
              {
                options.map((item,i)=>
                <h4 className={reason === item ? "selectedTextBold" : "selectedText"} onClick={()=>{changeReason(item)}} key={i}>{item}</h4>
                )
              }
            </div>
          }
          </div>
          <button className={buttonDisabled ? "submitButtonDisabled":"submitButton"} >Connect</button>
        </form>

        <p className="dataInfoText">
          *Video calls will use data allotment if connected to cellular data.
          <br></br>
          Standard data rates according to your cellular plan apply.
        </p>
       </div>
    </div>
  );
}

export default VideoCallForm;

export function setIncomingCall(data){
    return{
      type: "IncomingCall",
      payload: {
        status:data
      }
    };
}

export function changeAnnotateWidth(data){
  return{
    type: "ChangeAnnotateWidth",
    payload: {
      value:data
    }
  };
}

export function changeAnnotateColor(data){
  return{
    type: "ChangeAnnotateColor",
    payload: {
     value:data
    }
  };
}

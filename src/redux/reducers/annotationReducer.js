const initialState = {
    width:5,
    color:"red"
}
export default function (state = initialState, action) {
    switch (action.type) {
      case "ChangeAnnotateWidth":
        return {
            ...state,
            width:action.payload.value
        };
        case "ChangeAnnotateColor":
        return {
            ...state,
            color:action.payload.value
        };
      default:
        return state;
    }
}
export default function (state = false, action) {
    switch (action.type) {
      case "IncomingCall":
        return action.payload.status;
      default:
        return state;
    }
}
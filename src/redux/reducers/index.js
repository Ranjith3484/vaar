import {combineReducers} from 'redux';
import annotationReducer from './annotationReducer';
import incomingCallReducer from './incomingCallReducer';

const allReducers= combineReducers({
  incomingCall: incomingCallReducer,
  annotate:annotationReducer
});

export default allReducers;
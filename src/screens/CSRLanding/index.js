import React from 'react';
import { useNavigate } from 'react-router-dom';
import IncomingCall from '../../components/incomingCall';
import { setIncomingCall } from '../../redux/actions';
import CommonLandingUI from '../CommonLanding';
import { useSelector,useDispatch } from 'react-redux';

function CsrLandingScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const incomingCall = useSelector(state => state.incomingCall);

    const acceptCall = () =>{
        dispatch(setIncomingCall(false));
        navigate('/csr/chat')
    }

    const declineCall = () =>{
        dispatch(setIncomingCall(false));
    }

    return ( 
        <div>
             <CommonLandingUI csr={true}/>
            {incomingCall &&  <IncomingCall acceptCall={acceptCall} declineCall={declineCall}/>}
        </div>
     );
}

export default CsrLandingScreen;
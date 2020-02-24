import React, { useEffect } from 'react'; 
import ChatPanel from '../ChatPanel';
import {connect} from 'react-redux';
import Wallpaper from '../Wallpaper';


const RightPanel = ({room, addClass}) => {

    useEffect(()=>{
        console.log(room);
        if(room) addClass('chatting');
        
    })
    return <>{ (room) ? <ChatPanel/> : <Wallpaper/> }</>

}

const stateMap = (state) => {
    return {
        room: state.room
    }

}

export default connect(stateMap)(RightPanel)

import React from 'react';
import './ChatHistory.scss';
// import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message';

const ChatHistory = ({ messages, name }) => {
    return (
            <div className='history w-100 p-3'>
                {messages.map((message, i) => <Message index={`${name}+${i}`} message={message} name={name}/>)}
            </div>
        )
    };


export default ChatHistory



    


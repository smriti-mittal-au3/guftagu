import React from 'react';

import './Message.scss';

import ReactEmoji from 'react-emoji';

const Message = ({ index, message: { text, to }, name }) => {
  let isSentByCurrentUser = true;

  const trimmedName = name.trim().toLowerCase();

  if(to === trimmedName) {
    isSentByCurrentUser = false;
  }

  return (
    isSentByCurrentUser
      ? (
        <div key={index} className="messageBox backgroundGreen justifyEnd my-1">
            <p className="messageText text-black">{ReactEmoji.emojify(text)}</p>
        </div>
        )
        : (
          <div key={index} className="messageBox bg-white justifyStart my-1">
            <p className="messageText text-black">{ReactEmoji.emojify(text)}</p>
          </div>
        )
  );
}

export default Message;
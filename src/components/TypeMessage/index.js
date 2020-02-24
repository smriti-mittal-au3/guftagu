import React from 'react';

import './TypeMessage.scss';

const TypeMessage = ({ setMessage, sendMessage, message }) => (
    <input
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
)



export default TypeMessage
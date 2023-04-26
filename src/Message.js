import React from 'react';

function Message({ text, onDismiss }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f2f2f2',
        color: '#333',
        border: '10px solid #333',
        padding: 20,
        zIndex: 100,
        fontFamily: 'Consolas, monospace',
        fontSize: '2rem'
      }}
    >
      <p>{text}</p>
    </div>
  );
}

export default Message;


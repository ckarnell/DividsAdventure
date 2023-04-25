import React from 'react';

function Room({ children, style }) {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 1500, height: 800, backgroundColor: '#f2f2f2', border: '10px solid #333', boxSizing: 'border-box', overflow: 'hidden', ...style }}>
      {children}
    </div>
  );
}

export default Room;

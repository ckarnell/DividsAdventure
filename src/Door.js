import React from 'react';

function Door() {
  const doorWidth = 100;
  const doorHeight = 10;

  return (
    <div
      style={{
        zIndex: 2,
        position: 'absolute',
        bottom: -400,
        left: '50%',
        transform: 'translateX(-50%)',
        width: doorWidth,
        height: doorHeight,
        backgroundColor: 'brown',
        border: '1px solid #333',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          zIndex: 2,
          position: 'absolute',
          bottom: 8,
          left: '25%',
          right: 20,
          transform: 'translateX(-50%)',
          width: 15,
          height: 5,
          backgroundColor: 'gold',
          border: '1px solid #333',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

export default Door;

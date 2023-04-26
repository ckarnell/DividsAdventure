import React from 'react';

function Door({ isOpen, wall, color, name }) {
  const doorWidth = 100;
  const doorHeight = 10;

  const bottom =  wall === 'south' ? -400 : 400 - 10;
  const doorknobBottom = wall === 'south' ? 8 : -5;
  return (
    <div
      id={name}
      name={name}
      style={{
        zIndex: 2,
        position: 'absolute',
        bottom,
        left: '50%',
        transform: 'translateX(-50%)',
        width: doorWidth,
        height: doorHeight,
        backgroundColor: isOpen ? '#f2f2f2' : color,
        border: isOpen ? '0px' : '1px solid #333',
        boxSizing: 'border-box',
      }}
    >
    {isOpen ? null : 
      <div
        style={{
          zIndex: 2,
          position: 'absolute',
          bottom: doorknobBottom,
          left: '25%',
          right: 20,
          transform: 'translateX(-50%)',
          width: 15,
          height: 5,
          backgroundColor: 'gold',
          border: '1px solid #333',
          boxSizing: 'border-box',
        }}
      />}
    </div>
  );
}

export default Door;


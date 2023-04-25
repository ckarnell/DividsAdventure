import React from 'react';

function Door({ isOpen }) {
  const doorWidth = 100;
  const doorHeight = 10;

  console.log('isOpen: ', isOpen); // TODO: Delete 
  return (
    <div
      id='door'
      style={{
        zIndex: 2,
        position: 'absolute',
        bottom: -400,
        left: '50%',
        transform: 'translateX(-50%)',
        width: doorWidth,
        height: doorHeight,
        backgroundColor: isOpen ? '#f2f2f2' : 'brown',
        border: isOpen ? '0px' : '1px solid #333',
        boxSizing: 'border-box',
      }}
    >
    {isOpen ? null : 
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
      />}
    </div>
  );
}

export default Door;


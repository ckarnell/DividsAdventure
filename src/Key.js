import React from 'react';

function Key({ style, name }) {
  return (
    <div
      id="key"
      name={name}
      style={{
        position: 'absolute',
        top: '50%',
        right: '10%',
        transform: 'translateY(-50%)',
        width: 10,
        height: 30,
        backgroundColor: 'gold',
        border: '5px solid #333',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        ...style,
      }}
    >
      <div
        id="tooth1"
        style={{
          position: 'absolute',
          left: '10px',
          width: 10,
          height: 5,
          backgroundColor: 'gold',
          borderBottom: '5px solid #333',
          borderRight: '5px solid #333',
          borderTop: '5px solid #333',
          borderTopRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          marginTop: -5,
        }}
      />
      <div
        id="tooth2"
        style={{
          position: 'absolute',
          top: '15px',
          left: '10px',
          width: 10,
          height: 5,
          backgroundColor: 'gold',
          borderBottom: '5px solid #333',
          borderRight: '5px solid #333',
          borderTop: '5px solid #333',
          borderTopRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          marginTop: -5,
        }}
      />
      <div
        style={{
          zIndex: -1,
          top: 25,
          position: 'absolute',
          width: 25,
          height: 25,
          backgroundColor: 'gold',
          border: '5px solid #333',
          borderRadius: '50%',
          marginTop: 'auto',
        }}
      />
    </div>
  );
}

export default Key;


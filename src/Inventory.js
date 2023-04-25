import React from 'react';

function Inventory() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 200,
        height: 50,
        backgroundColor: '#f2f2f2',
        border: '10px solid #333',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <div style={{ width: 30, height: 30, backgroundColor: '#fff', border: '1px solid #333' }} />
      <div style={{ width: 30, height: 30, backgroundColor: '#fff', border: '1px solid #333' }} />
      <div style={{ width: 30, height: 30, backgroundColor: '#fff', border: '1px solid #333' }} />
      <div style={{ width: 30, height: 30, backgroundColor: '#fff', border: '1px solid #333' }} />
    </div>
  );
}

export default Inventory;


import React, { useState, useEffect } from 'react';

function MovableSquare({ moveLeft, moveRight, moveUp, moveDown }) {
  const roomWidth = 1500;
  const roomHeight = 800;
  const squareSize = 50;

  const [position, setPosition] = useState({
    x: (roomWidth - squareSize) / 2,
    y: (roomHeight - squareSize) / 2,
  });

  useEffect(() => {
    let intervalId;

    if (moveLeft || moveRight || moveUp || moveDown) {
      intervalId = setInterval(() => {
        setPosition(prevPosition => {
          let x = prevPosition.x;
          let y = prevPosition.y;

          if (moveLeft) {
            x = Math.max(x - 10, 0);
          }

          if (moveRight) {
            x = Math.min(x + 10, roomWidth - squareSize);
          }

          if (moveUp) {
            y = Math.max(y - 10, 0);
          }

          if (moveDown) {
            y = Math.min(y + 10, roomHeight - squareSize);
          }

          return { x, y };
        });
      }, 16);
    }

    return () => clearInterval(intervalId);
  }, [moveLeft, moveRight, moveUp, moveDown]);

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: squareSize,
        height: squareSize,
        backgroundColor: '#333',
      }}
    />
  );
}

export default MovableSquare;


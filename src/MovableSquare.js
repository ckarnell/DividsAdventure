import React, { useState, useEffect } from 'react';

function MovableSquare({ moveLeft, moveRight, moveUp, moveDown, onCollision }) {
  const roomWidth = 1500 - 10;
  const roomHeight = 800 - 10;
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
            x = Math.min(x + 10, roomWidth - squareSize - 10);
          }

          if (moveUp) {
            y = Math.max(y - 10, 0);
          }

          if (moveDown) {
            y = Math.min(y + 10, roomHeight - squareSize - 10);
          }

          return { x, y };
        });
      }, 16);
    }

    return () => clearInterval(intervalId);
  }, [moveLeft, moveRight, moveUp, moveDown]);

  useEffect(() => {
    const key = document.getElementById('key');
    const door = document.getElementById('door');
    const squareRect = document.getElementById('movable-square').getBoundingClientRect();

    if (key) {
      const keyRect = key.getBoundingClientRect();

      if (
        squareRect.left <= keyRect.right &&
        squareRect.right >= keyRect.left &&
        squareRect.top <= keyRect.bottom &&
        squareRect.bottom >= keyRect.top
      ) {
        onCollision('key');
      }
    }

    if (door) {
      const doorRect = door.getBoundingClientRect();

      if (
        squareRect.left <= doorRect.right &&
        squareRect.right >= doorRect.left &&
        squareRect.top <= doorRect.bottom &&
        squareRect.bottom >= doorRect.top
      ) {
        onCollision('door');
      }
    }
  }, [position, onCollision]);

  return (
    <div
      id="movable-square"
      style={{
        zIndex: 3,
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


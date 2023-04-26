import React, { useState, useEffect } from 'react';

const css = `
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${100 / 3}px;
    width: ${100 / 3}px;
    background-color: #f5f5f5;
    margin: 0;
}
.head {
    width: ${100/3}px;
    height: ${100/3}px;
    background-color: #f1c27d;
    border-radius: 50%;
    position: relative;
}
.eye {
    width: ${20 / 3}px;
    height: ${20 / 3}px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 30%;
    left: 40%;
}
.nose {
    width: ${10 / 3}px;
    height: ${10 / 3}px;
    background-color: #f0e68c;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 45%;
}
.mouth {
    width: ${30 / 3}px;
    height: ${10 / 3}px;
    background-color: #b22222;
    border-radius: ${5 / 3}px;
    position: absolute;
    top: 70%;
    left: 35%;
}
.body {
    width: ${150 / 3}px;
    height: ${200 / 3}px;
    background-color: #f1c27d;
    border-radius: ${20 / 3}px;
    position: relative;
    margin-top: ${20 / 3}px;
    animation: walk 1s infinite;
}
.arm {
    width: ${50 / 3}px;
    height: ${150 / 3}px;
    background-color: #f1c27d;
    border-radius: ${20 / 3}px;
    position: absolute;
    top: -50%;
    left: -20%;
    transform: rotate(-45deg);
}
.leg {
    width: ${50 / 3}px;
    height: ${150 / 3}px;
    background-color: #f1c27d;
    border-radius: ${20 / 3}px;
    position: absolute;
    top: 70%;
    left: -20%;
    transform: rotate(45deg);
    animation: walk 1s infinite alternate;
    animation-delay: 0.5s;
}
@keyframes walk {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(20deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
`;

function Divid({ moveLeft, moveRight, moveUp, moveDown, onCollision, messageShowing, spawnPosition }) {
  const roomWidth = 1500 - 10;
  const roomHeight = 800 - 10;
  const squareSize = 50;

  const initialPosition = {
    x: (roomWidth - squareSize) / 2,
    y: (roomHeight - squareSize) / 2,
  }
  if (spawnPosition === 'north') {
    initialPosition.x = (roomWidth - squareSize) / 2;
    initialPosition.y = 1;
  } else if (spawnPosition === 'south') {
    initialPosition.x = (roomWidth - squareSize) / 2;
    initialPosition.y = roomHeight - 61;
  }
  const [position, setPosition] = useState(initialPosition);
  const [facingLeft, setFacingLeft] = useState(false);

  useEffect(() => {
    let intervalId;

    if (moveLeft || moveRight || moveUp || moveDown) {
      intervalId = setInterval(() => {
        setPosition(prevPosition => {
          let x = prevPosition.x;
          let y = prevPosition.y;

          if (moveLeft) {
            setFacingLeft(true);
            x = Math.max(x - 10, 0);
          }

          if (moveRight) {
            setFacingLeft(false);
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
    const door1 = document.getElementById('door1');
    const door2 = document.getElementById('door2');
    const squareRect = document.getElementById('movable-square').getBoundingClientRect();

    if (key) {
      const keyRect = key.getBoundingClientRect();

      if (
        squareRect.left <= keyRect.right &&
        squareRect.right >= keyRect.left &&
        squareRect.top <= keyRect.bottom &&
        squareRect.bottom >= keyRect.top
      ) {
        onCollision(key.getAttribute('name'));
        return;
      }
    }

    if (door1) {
      const doorRect = door1.getBoundingClientRect();

      if (
        squareRect.left <= doorRect.right &&
        squareRect.right >= doorRect.left &&
        squareRect.top <= doorRect.bottom &&
        squareRect.bottom >= doorRect.top
      ) {
        console.log('GOT HERE');
        onCollision(door1.getAttribute('name'));
        return;
      }
    }

    if (door2) {
      const doorRect = door2.getBoundingClientRect();

      if (
        squareRect.left <= doorRect.right &&
        squareRect.right >= doorRect.left &&
        squareRect.top <= doorRect.bottom &&
        squareRect.bottom >= doorRect.top
      ) {
        onCollision(door2.getAttribute('name'));
        return;
      }
    }

    if (messageShowing) {
      // Remove messages if we're not touching anything and a message was showing before
      onCollision(null);
    }
  }, [position, onCollision]);

  return (
    <div id="movable-square" style={{
      transform: `${facingLeft ? 'scaleX(-1)' : ''}`,
      position: 'absolute',
      top: position.y,
      left: position.x,
      width: squareSize,
      height: squareSize,
      // backgroundColor: '#333',
    }}>
      <style>{css}</style>
      <div className="container">
          <div className="person" id="person">
              <div className="head">
                  <div className="eye"></div>
                  <div className="eye" style={{left: "60%"}}></div>
                  <div className="nose"></div>
                  <div className="mouth"></div>
              </div>
              <div className="body">
                  <div className="arm"></div>
                  <div className="leg"></div>
                  <div className="arm" style={{left: '120%', transform: 'rotate(225deg)'}}></div>
                  <div className="leg" style={{left: '120%', transform: 'rotate(-225deg)'}}></div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default Divid;

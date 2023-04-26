import React, { useState, useEffect } from 'react';

const css = `
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}
.head {
    width: 100px;
    height: 100px;
    background-color: #f1c27d;
    border-radius: 50%;
    position: relative;
}
.eye {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 30%;
    left: 40%;
}
.nose {
    width: 10px;
    height: 10px;
    background-color: #f0e68c;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 45%;
}
.mouth {
    width: 30px;
    height: 10px;
    background-color: #b22222;
    border-radius: 5px;
    position: absolute;
    top: 70%;
    left: 35%;
}
.body {
    width: 150px;
    height: 200px;
    background-color: #f1c27d;
    border-radius: 20px;
    position: relative;
    margin-top: 20px;
    animation: walk 1s infinite;
}
.arm {
    width: 50px;
    height: 150px;
    background-color: #f1c27d;
    border-radius: 20px;
    position: absolute;
    top: -50%;
    left: -20%;
    transform: rotate(-45deg);
}
.leg {
    width: 50px;
    height: 150px;
    background-color: #f1c27d;
    border-radius: 20px;
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
<!DOCTYPE html>
<html>
<head>
	<style>
		.container {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100vh;
			background-color: #f5f5f5;
		}
		.head {
			width: 100px;
			height: 100px;
			background-color: #f1c27d;
			border-radius: 50%;
			position: relative;
		}
		.eye {
			width: 20px;
			height: 20px;
			background-color: #fff;
			border-radius: 50%;
			position: absolute;
			top: 30%;
			left: 40%;
		}
		.nose {
			width: 10px;
			height: 10px;
			background-color: #f0e68c;
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 45%;
		}
		.mouth {
			width: 30px;
			height: 10px;
			background-color: #b22222;
			border-radius: 5px;
			position: absolute;
			top: 70%;
			left: 35%;
		}
		.body {
			width: 150px;
			height: 200px;
			background-color: #f1c27d;
			border-radius: 20px;
			position: relative;
			margin-top: 20px;
			animation: walk 1s infinite;
		}
		.arm {
			width: 50px;
			height: 150px;
			background-color: #f1c27d;
			border-radius: 20px;
			position: absolute;
			top: -50%;
			left: -20%;
			transform: rotate(-45deg);
		}
		.leg {
			width: 50px;
			height: 150px;
			background-color: #f1c27d;
			border-radius: 20px;
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
    const door = document.getElementById('door1');
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

    if (door) {
      const doorRect = door.getBoundingClientRect();

      if (
        squareRect.left <= doorRect.right &&
        squareRect.right >= doorRect.left &&
        squareRect.top <= doorRect.bottom &&
        squareRect.bottom >= doorRect.top
      ) {
        onCollision(door.getAttribute('name'));
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
    <>
    <style>{css}</style>
  <div id="movable-square" class="container">
      <div class="person">
          <div class="head">
              <div class="eye"></div>
              <div class="eye" style="left: 60%;"></div>
              <div class="nose"></div>
              <div class="mouth"></div>
          </div>
          <div class="body">
              <div class="arm"></div>
              <div class="leg"></div>
              <div class="arm" style={{left: '120%', transform: 'rotate(225deg)'}}></div>
              <div class="leg" style={{left: '120%', transform: 'rotate(-225deg)'}}></div>
          </div>
      </div>
  </div>
    </>
  );
}

export default Divid;

import React from 'react';
import './App.css';
import Room from './Room';
import MovableSquare from './MovableSquare';
import Inventory from './Inventory';
import Key from './Key';

function App() {
  const [moveLeft, setMoveLeft] = React.useState(false);
  const [moveRight, setMoveRight] = React.useState(false);
  const [moveUp, setMoveUp] = React.useState(false);
  const [moveDown, setMoveDown] = React.useState(false);

  React.useEffect(() => {
    function handleKeyDown(event) {
      switch (event.key) {
        case 'ArrowLeft':
          setMoveLeft(true);
          break;
        case 'ArrowRight':
          setMoveRight(true);
          break;
        case 'ArrowUp':
          setMoveUp(true);
          break;
        case 'ArrowDown':
          setMoveDown(true);
          break;
        default:
          break;
      }
    }

    function handleKeyUp(event) {
      switch (event.key) {
        case 'ArrowLeft':
          setMoveLeft(false);
          break;
        case 'ArrowRight':
          setMoveRight(false);
          break;
        case 'ArrowUp':
          setMoveUp(false);
          break;
        case 'ArrowDown':
          setMoveDown(false);
          break;
        default:
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header" />
      <Inventory />
      <div style={{ position: 'relative', marginTop: '-475px' }}>
        <Room>
          <MovableSquare
            moveLeft={moveLeft}
            moveRight={moveRight}
            moveUp={moveUp}
            moveDown={moveDown}
        />
        <Key />
      </Room>
    </div>
  </div>
    );
}

export default App;
    

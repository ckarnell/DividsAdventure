import React from 'react';
import './App.css';
import Room from './Room';
import MovableSquare from './MovableSquare';
import Inventory from './Inventory';
import Key from './Key';
import Door from './Door';

function App() {
  const [moveLeft, setMoveLeft] = React.useState(false);
  const [moveRight, setMoveRight] = React.useState(false);
  const [moveUp, setMoveUp] = React.useState(false);
  const [moveDown, setMoveDown] = React.useState(false);
  const [keyVisible, setKeyVisible] = React.useState(true);
  const [inventory, setInventory] = React.useState([null, null, null, null]);
  const [doorOpen, setDoorOpen] = React.useState(false);

  function handleKeyPickup() {
    setKeyVisible(false);
    setInventory(prevInventory => {
      const updatedInventory = [...prevInventory];
      updatedInventory[0] = <Key />;
      return updatedInventory;
    });
  }

  function handleDoorOpen() {
    setDoorOpen(true);
  }

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
    <div className="App" style={{ backgroundColor: '#D3D3D3' }}>
      <header className="App-header" />
      <Inventory items={inventory} />
      <div style={{ position: 'relative', marginTop: '-475px' }}>
        <Room key="firstRoom">
          <MovableSquare
            moveLeft={moveLeft}
            moveRight={moveRight}
            moveUp={moveUp}
            moveDown={moveDown}
            onCollision={obj => {
              if (obj === 'key') {
                handleKeyPickup();
              } else if (obj === 'door') {
                if (inventory[0]?.type?.name === 'Key') {
                  handleDoorOpen();
                }
              }
            }}
          />
          {keyVisible && <Key />}
        </Room>
        <Door isOpen={doorOpen} />
    {doorOpen ? 
          <Room style={{ top: '800px', borderTop: '0px' }} key="secondRoom">
          </Room>
      : null}
      </div>
    </div>
  );
}

export default App;


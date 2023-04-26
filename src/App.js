import React from 'react';
import './App.css';
import Room from './Room';
import Divid from './Divid';
import Inventory from './Inventory';
import Key from './Key';
import Door from './Door';
import Message from './Message';

function App() {
  const [moveLeft, setMoveLeft] = React.useState(false);
  const [moveRight, setMoveRight] = React.useState(false);
  const [moveUp, setMoveUp] = React.useState(false);
  const [moveDown, setMoveDown] = React.useState(false);
  const [keyVisible, setKeyVisible] = React.useState(true);
  const [inventory, setInventory] = React.useState([null, null, null, null]);
  const [door1Open, setDoor1Open] = React.useState(false);
  const [door2Open, setDoor2Open] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [roomIndex, setRoomIndex] = React.useState(0);

  function handleKeyPickup() {
    setKeyVisible(false);
    setInventory(prevInventory => {
      const updatedInventory = [...prevInventory];
      updatedInventory[updatedInventory.indexOf(null)] = <Key  style={{transform: 'scale(0.45)', top: '-35%', left: '8%' }} />;
      return updatedInventory;
    });
  }

  function handleDoor1Open() {
    setDoor1Open(true);
    const key = inventory.find(item => item?.type?.name === 'Key')
    const newInventory = [...inventory];
    newInventory[inventory.indexOf(key)] = null;
    setInventory(newInventory)
  }

  function handleDoor2Open() {
    setDoor2Open(true);
    const key = inventory.find(item => item?.type?.name === 'Key')
    const newInventory = [...inventory];
    newInventory[inventory.indexOf(key)] = null;
    setInventory(newInventory)
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
      <div className="inventory-container">
        <Inventory items={inventory} />
      </div>
      <div style={{ position: 'relative', marginTop: '-475px' }}>
    {roomIndex === 0 ?
      <>
        <Room key="firstRoom">
          <Divid
            key="squareRoom1"
            messageShowing={!!message}
            moveLeft={moveLeft}
            moveRight={moveRight}
            moveUp={moveUp}
            moveDown={moveDown}
            spawnPosition={door1Open ? 'south' : null}
            onCollision={obj => {
              if (obj === 'key1') {
                handleKeyPickup();
              } else if (obj === 'door1') {
                if (inventory.find(item => item?.type?.name === 'Key')) {
                  handleDoor1Open();
                } else if (!door1Open) {
                  setMessage('It\'s locked');
                } else {
                  setRoomIndex(1);
                }
              } else if (obj === null) {
                setMessage('');
              }
            }}
          />
          {keyVisible && <Key name="key1" />}
        </Room>
        <Door isOpen={door1Open} wall="south" color="brown" name="door1" />
      </>
        : null}
        {message && <Message text={message} />}
        {roomIndex === 1 && (
          <>
            <Door isOpen={door1Open} wall="north" color="brown" name="door1"/>
            <Room key="secondRoom" style={{ backgroundColor: '67B7D1' }}>
              <Divid
                key="squareRoom2"
                messageShowing={!!message}
                moveLeft={moveLeft}
                spawnPosition="north"
                moveRight={moveRight}
                moveUp={moveUp}
                moveDown={moveDown}
                onCollision={obj => {
                  if (obj === 'key2') {
                    handleKeyPickup();
                  } else if (obj === 'door2') {
                    if (inventory[0]?.type?.name === 'Key') {
                      handleDoor2Open();
                    } else if (!door2Open) {
                      setMessage('It\'s locked');
                    } else {
                      setRoomIndex(1);
                    }
                  } else if (obj === 'door1') {
                    setRoomIndex(0);
                  } else if (obj === null) {
                    setMessage('');
                  }
                }}
              />
            </Room>
            <Door isOpen={door2Open} wall="south" color="yellow" name="door2" />
          </>
        )}
      </div>
    </div>
  );
}

export default App;


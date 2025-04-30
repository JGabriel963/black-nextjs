import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'

const data = [
  { id: 1, option: 'BRINDE' },
  { id: 2, option: 'Tente novamente' },
  { id: 3, option: '1 INGRESSO' },
  { id: 4, option: 'BRINDE' },
  { id: 5, option: 'PERDEU A VEZ' },
  { id: 6, option: 'PIRULITO' },
];

export default function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', width: '100vw' }}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          disableInitialAnimation={true}
          outerBorderColor='#FFFFFF'
          innerBorderColor='white'
          spinDuration={0.6}

          onStopSpinning={() => {
            setMustSpin(false);
            alert(data[prizeNumber].option)
          }}
        />
        <button onClick={handleSpinClick}>SPIN</button>
      </div>
  )
}
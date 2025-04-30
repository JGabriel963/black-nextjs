'use client'

import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"


const data = [
  { id: 1, option: 'BRINDE' },
  { id: 2, option: 'Tente novamente' },
  { id: 3, option: '1 INGRESSO' },
  { id: 4, option: 'BRINDE' },
  { id: 5, option: 'PERDEU A VEZ' },
  { id: 6, option: 'PIRULITO' },
];


export default function Home() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [open, setOpen] = useState(false)


  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  return (
      <div className='flex flex-col w-full h-full justify-center items-center bg-slate-800'>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          disableInitialAnimation={true}
          outerBorderColor='#FFFFFF'
          innerBorderColor='white'
          spinDuration={0.4}

          onStopSpinning={() => {
            setMustSpin(false);
            setOpen(true)
          }}
        />
        <Button className='bg-blue-950 border-white border-1 text-white hover:bg-blue-600' onClick={handleSpinClick}>
          Girar roleta
        </Button>

      <Dialog open={open}>
      <DialogContent className='bg-slate-400' onClick={() => setOpen(!open)}>
        <DialogHeader>
          <DialogTitle>Parabéns‼ 🎉🎉🎉🎉🎊</DialogTitle>
          <DialogDescription>
            Você acaba de ganhar um {data[prizeNumber].option}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

      </div>
  )
}

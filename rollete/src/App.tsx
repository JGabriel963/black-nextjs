import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Button } from "./components/ui/button";
import { ExternalLink } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Confetti from "react-confetti";


const data = [
  { id: 1, option: "MARCA PÁGINAS" },
  { id: 2, option: "CARTÕES-POSTAIS" },
  { id: 3, option: "PORTA COPOS" },

];

export default function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r bg-neutral-950 relative">
      <div className="relative">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          disableInitialAnimation={true}
          outerBorderColor="#FFFFFF"
          outerBorderWidth={4}
          innerBorderColor={"#f2f2f2"}
          radiusLineColor={"tranparent"}
          radiusLineWidth={1}
          fontSize={16}
          textDistance={55}
          textColors={["white"]}
          fontWeight="bold"
          spinDuration={0.6}
          backgroundColors={[
            "#8F8F8F",
            "#323232",
            "#0F0F0F",
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
            setOpen(true);
            setConfetti(true);
          }}
        />

        <div className="absolute top-[50%] left-[50%] z-20 translate-x-[-55%] translate-y-[-55%] size-12 bg-white rounded-full shadow-md" />
      </div>
      <Button
        onClick={handleSpinClick}
        className="border-1 border-transparent hover:border-white cursor-pointer"
      >
        GIRAR
      </Button>

      {/* External Link */}
      <a href="https://nasaex.com/totem?cod=mero" target="_self" className="absolute top-2 right-2">
        <ExternalLink className=" hover:text-slate-200 transition cursor-pointer" />
      </a>


      {/* Pop-up */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <p>Parabéns 🎉🎉</p>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p>Você acabou de ganhar <span className="font-medium"> {data[prizeNumber].option} </span>!
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <a href="https://nasaex.com/totem?cod=mero" target="_self">

              <AlertDialogCancel className="cursor-pointer" onClick={() => {
                setOpen(false);
                setConfetti(false);
              }}>
                Continuar
              </AlertDialogCancel>
            </a>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Contetti */}
      {confetti && (
        <Confetti
          className="w-full h-screen"
          width={screen.width}
          height={screen.height}
          tweenDuration={1000}
        />
      )}
    </div>
  );
}
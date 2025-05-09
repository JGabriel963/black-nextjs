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

const alert = [
  { id: 1, title: "Parabéns 🎉🎉", message: "Você acaba de ganhar um ", prize: "BRINDE", confetti: true, repeat: false },
  { id: 2, title: "Talvez na próxima", message: "Você pode tentar novamente", prize: "", confetti: false, repeat: true },
  { id: 3, title: "Que pena!", message: "Infelismente não foi dessa vez!", prize: "", confetti: false, repeat: false },
  { id: 4, title: "Parabéns 🎉🎉", message: "Você acaba de ganhar um ", prize: "1 INGRESSO", confetti: true, repeat: false },
  { id: 5, title: "Que pena!", message: "Infelismente não foi dessa vez!", prize: "", confetti: false, repeat: false },

]

const data = [
  { id: 1, option: "1 BRINDE" },
  { id: 2, option: "TENTE NOVAMENTE" },
  { id: 3, option: "PERDEU A VEZ" },
  { id: 4, option: "1 INGRESSO" },
  { id: 5, option: "PERDEU A VEZ" },
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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#314367] to-[#2B3856] relative">
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
          textColors={["white"]}
          fontWeight="bold"
          spinDuration={0.6}
          backgroundColors={[
            "#60a5fa",
            "#64b031",
            "oklch(63.7% 0.237 25.331)",
            "#60a5fa",
            "oklch(63.7% 0.237 25.331)",
            "oklch(63.7% 0.237 25.331)"
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
            setOpen(true);
            setConfetti(alert[prizeNumber].confetti);
          }}
        />

        <div className="absolute top-[50%] left-[50%] z-20 translate-x-[-55%] translate-y-[-55%] size-12 bg-white rounded-full shadow-md cursor-pointer" onClick={handleSpinClick} />
      </div>
      <Button
        onClick={handleSpinClick}
        className="border-1 border-transparent hover:border-white cursor-pointer"
      >
        GIRAR
      </Button>

      {/* External Link */}
      <a href="https://nasaex.com/totem?cod=Xand_bar" target="_self" className="absolute top-2 right-2">
        <ExternalLink className=" hover:text-slate-200 transition cursor-pointer" />
      </a>


      {/* Pop-up */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <p> {alert[prizeNumber].title} </p>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p> {alert[prizeNumber].message} <span className="font-medium"> {alert[prizeNumber].prize} </span>!
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {alert[prizeNumber].repeat ?
              <AlertDialogCancel className="cursor-pointer" onClick={() => {
                setOpen(false);
                setConfetti(false);
              }}>
                Continuar
              </AlertDialogCancel> : <a href="https://nasaex.com/totem?cod=Xand_bar">
                <AlertDialogCancel className="cursor-pointer" onClick={() => {
                  setOpen(false);
                  setConfetti(false);
                }}>
                  Continuar
                </AlertDialogCancel>
              </a>
            }

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

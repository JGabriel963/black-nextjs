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
  { id: 1, option: "BRINDE" },
  { id: 2, option: "Tente novamente" },
  { id: 3, option: "1 INGRESSO" },
  { id: 4, option: "BRINDE" },
  { id: 5, option: "PERDEU A VEZ" },
  { id: 6, option: "PIRULITO" },
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
          fontSize={18}
          spinDuration={0.6}
          backgroundColors={[
            "#60a5fa",
            "#64b031",
            "oklch(90.5% 0.182 98.111)",
            "#60a5fa",
            "oklch(63.7% 0.237 25.331)",
            "#fb7185",
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
            setOpen(true);
            const option = data[prizeNumber].id
            if (option === 1 || option === 3 || option === 4 || option === 6) {
              setConfetti(true);
            }
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
      <a href="https://nasaex.com/version-test/totem?cod=Xand_bar" target="_self" className="absolute top-2 right-2">
        <ExternalLink className=" hover:text-slate-200 transition cursor-pointer" />
      </a>


      {/* Pop-up */}
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {data[prizeNumber].id === 5 && "PERDEU A VEZ 😓"}
              {data[prizeNumber].id === 2 && "TENTE NOVAMENTE 🔁"}
              {data[prizeNumber].id !== 5 && data[prizeNumber].id !== 2 ? "Parabéns 🎉🎉" : ""}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {data[prizeNumber].id === 5 && " Infelizmente não foi dessa vez."}
              {data[prizeNumber].id === 2 && "Quase lá! Gire a roleta mais uma vez e tente a sorte novamente."}

              {data[prizeNumber].id !== 5 && data[prizeNumber].id !== 2 ? <p>
                Você acabou de ganhar <span className="font-medium"> {data[prizeNumber].option} </span>!
              </p> : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {data[prizeNumber].id === 2 ? <AlertDialogCancel className="cursor-pointer" onClick={() => {
              setOpen(false);
              setConfetti(false);
            }}>
              Continuar
            </AlertDialogCancel> : <a href="https://nasaex.com/version-test/totem?cod=Xand_bar" target="_self">
              <AlertDialogCancel className="cursor-pointer" onClick={() => {
                setOpen(false);
                setConfetti(false);
              }}>
                Continuar
              </AlertDialogCancel>
            </a>}
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

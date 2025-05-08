import { useEffect, useState } from "react";
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
  { id: 2, option: "PERDEU A VEZ" },
  { id: 3, option: "1 INGRESSO" },
  { id: 4, option: "BRINDE" },
  { id: 5, option: "PERDEU A VEZ" },
  { id: 6, option: "TENTE NOVAMENTE" },
];



export default function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [prizers, setPrizers] = useState<any[]>([])
  const [dataPrizers, setDataPrizers] = useState<any[]>([])
  const [colors, setColors] = useState<any[]>([])
  const [zoom, setZoom] = useState(1);

  async function getPrizers() {
    const response = await fetch("https://nasago.bubbleapps.io/version-test/api/1.1/wf/rolleta").then(responso => responso.json())

    const datas = response.response.prizers

    setPrizers(datas)

    console.log(datas)

    const newDatas = datas.map((item: any) => {
      return { id: parseInt(item.id), option: item.name }
    })


    setDataPrizers(newDatas)

    const newColors = datas.map((item: any) => {
      return item.color
    })

    setColors(newColors)

    return datas
  }

  useEffect(() => {
    getPrizers()
      .then((res) => {
        console.log(res)
      })

      document.body.style.overflow = "hidden";
      setZoom(1.2);

  }, [])

  async function RemoveItemQuantity(id: any) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ 
      "premioId": id
    });

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://nasago.bubbleapps.io/version-test/api/1.1/wf/minus_item", requestOptions)
      .then(() => {
        setConfetti(false)
        setOpen(false)
      })
      .catch((error) => {
        console.log(error)
        window.location.href = "https://nasaex.com/totem?cod=mero"
      });
  }

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r bg-neutral-950" style={{
      transform: `scale(${zoom})`,
      transformOrigin: "center center", // centraliza o zoom
      transition: "transform 0.3s ease-in-out",
      overflow: 'hidden'
    }}>
      <div className="relative overflow-hidden">
        {dataPrizers.length > 0 && (
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={dataPrizers}
            disableInitialAnimation={true}
            outerBorderColor="#FFFFFF"
            outerBorderWidth={4}
            innerBorderColor={"#f2f2f2"}
            radiusLineColor={"tranparent"}
            radiusLineWidth={1}
            fontSize={16}
            fontWeight='bold'
            textColors={["white"]}
            spinDuration={0.6}
            backgroundColors={colors}
            onStopSpinning={() => {
              setMustSpin(false);
              setOpen(true);
              const option = data[prizeNumber].id
              if (option === 1 || option === 3 || option === 4) {
                setConfetti(true);
              }
            }}
          />
        )}


        <div className="absolute top-[50%] left-[50%] z-20 translate-x-[-55%] translate-y-[-55%] size-12 bg-white rounded-full shadow-md" />
      </div>
      <Button
        onClick={handleSpinClick}
        className="border-1 border-transparent hover:border-white cursor-pointer"
      >
        GIRAR
      </Button>




      {/* External Link */}
      {/* <a href="https://nasaex.com/totem?cod=mero" target="_self" className="absolute top-2 right-2">
        <ExternalLink className=" hover:text-slate-200 transition cursor-pointer" />
      </a> */}
      <div onClick={() => {
        window.location.href = "https://nasaex.com/totem?cod=mero"
      }} className="absolute top-2 right-2">
        <ExternalLink className=" hover:text-slate-200 transition cursor-pointer" />
      </div>


      {/* Pop-up */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Parabéns 🎉🎉🎉🎉
            </AlertDialogTitle>
            <AlertDialogDescription>
              Você ganhou um <span className="font-bold">
                {prizers[prizeNumber] ? prizers[prizeNumber].real : ""}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter >
              <AlertDialogCancel className="cursor-pointer" onClick={() => RemoveItemQuantity(prizers[prizeNumber]._id)}>
                Concluir
              </AlertDialogCancel>
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

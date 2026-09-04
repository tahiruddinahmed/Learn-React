import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Stats from "./components/stats";
import Dice from "./components/dice";

function App() {
  // Generate 10 random number, and the range is 1 to 6
  const generateNumbers = () => {
    return Array.from({length: 10}, () => {
     return {
       value: Math.floor(Math.random() * 6) + 1,
       isHeld: false,
       id: nanoid()

     }

    })
  }
  const [isGameBegin, setIsGameBegim] = useState(false)
  const [dices, setDices] = useState(() => generateNumbers());
  const [rollCount, setRollCount] = useState(0)
  const [timer, setTimer] = useState(0)


  // game own 
  // if all the dices are held && all the values are same 
  const isGameOwn = dices.every(dice => dice.isHeld == true) && dices.every(dice => dice.value === dices[0].value)

  // start timer when the game begin
  useEffect(() => {
    if(isGameBegin) {
      const intervalId = setInterval(() => {
        setTimer(prevTime => prevTime + 1)
      }, 1000)
  
      
      return () => clearInterval(intervalId)

    }

    // stop the timer when game own 
      // if(isGameOwn) {
      //   setTimer(prevTime => prevTime)
      // }

  }, [isGameBegin, isGameOwn])


  // hold a dice
  const handleClick = (id) => {
    setDices(prevDices => prevDices.map(dice => {
      if (dice.id === id) {
        return {
          ...dice,
          isHeld: !dice.isHeld
        }
      }
      return dice
    }))
  }

  // roll dices when click on the roll button
  // set a counter how many times, the dices have been rolled  
  const rollDices = () => {
    // make it simple roll all the dices, completed 
    // setDices(generateNumbers)

    // roll only the dices which are not being hold, 
    setDices(prevDices => prevDices.map(dice => {
      // check if the dice is not hold, false 
      if(dice.isHeld !== true) {
        return {
          ...dice,
          value: Math.floor(Math.random() * 6) + 1,          
        }
      } else {
        // just return the hold dice 
        return dice
      }
    }))

    setRollCount(prevCount => prevCount + 1)
  }


  


  // console.log(isGameOwn)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-6">
      {/* Decorative Blurs */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"></div>

      {/* Card */}
      <div
        className="
      relative
      w-full
      max-w-3xl
      rounded-[32px]
      border border-white/10
      bg-white/5
      backdrop-blur-2xl
      overflow-hidden
    "
      >
        {/* Top Accent */}
        {/* <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400"></div> */}

        {/* Header */}
        <div className="px-10 pt-10 text-center">
          <div
            className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          bg-orange-500/10
          border
          border-orange-500/20
          text-orange-300
          text-xs
          font-semibold
          uppercase
          tracking-[0.25em]
        "
          >
            Dice Game
          </div>

          <h1 className="mt-6 text-6xl font-black tracking-tight text-white">
            Tenz<span className="text-orange-400">ies</span>
          </h1>

          <p className="mt-4 max-w-md mx-auto text-slate-400 leading-relaxed">
            Roll until all dice are the same. Click each die to freeze it at its
            current value.
          </p>
        </div>

      {!isGameBegin ? 
      <div className="flex justify-center items-center h-[200px]">
       <button
          onClick={() => setIsGameBegim(prevValue => !prevValue)} 
          className="group
            relative
            overflow-hidden
            px-10
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-orange-500
            to-orange-400
            text-white
            font-bold
            text-lg
            shadow-[0_15px_40px_rgba(249,115,22,0.35)]
            hover:scale-105
            transition-all
            duration-300">Let's Play</button>
      </div>
      : 
        <div>

          {/* Stats */}
          <Stats rollCount={rollCount} timer={timer} />

          {/* Dice Grid */}
          <div className="grid grid-cols-5 gap-5 px-10 py-10">
            {dices.map((dice) => (
            <Dice dice={dice} key={dice.id} click={handleClick}/>

            ))}          
          </div>

          {/* CTA */}
          <div className="pb-10 flex justify-center">
            <button
              onClick={rollDices}
              className="
            group
            relative
            overflow-hidden
            px-10
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-orange-500
            to-orange-400
            text-white
            font-bold
            text-lg
            shadow-[0_15px_40px_rgba(249,115,22,0.35)]
            hover:scale-105
            transition-all
            duration-300
          "
            >
              Roll Dice
            </button>
          </div>
        </div>
      
      }

      </div>
    </div>
  );
}

export default App;

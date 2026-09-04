function Dice(props) {
    return (
         <button 
             onClick={() => props.click(props.dice.id)}
              key={props.dice.id}
              className={`
            group
            relative
            h-20
            rounded-2xl 
            ${props.dice.isHeld ? "bg-orange-500" : "bg-white"}
            text-slate-900
            text-3xl
            font-black
            shadow-[0_10px_30px_rgba(0,0,0,0.15)]
            hover:-translate-y-1
            hover:scale-105
            transition-all
            duration-300
              `}
            >
              {props.dice.value}
            </button>
    )
}

export default Dice
import { useState } from "react"
import Buttons from '../styles/buttons.module.css'
import { Eye, EyeClosedIcon } from "lucide-react";

// props are immutable - it means props value can't change directly 
function Child(props) {
//   props.name = 'John'; // can't do like this 
  const [isToggle, setIsToggle] = useState(false);


  const toggleBalance = () => {
    setIsToggle(prev => !prev);
  }


  return (
    <>
      <div className="">
        <p className="text-red-500">Greetings, {props.name}</p>
        <div className="flex my-5 ps-3 py-5 bg-gray-200 gap-10">
            <p className="text-[28px] font-semibold ">{isToggle ? props.balance : "*****"}</p>
            <button onClick={toggleBalance} className="cursor-pointer hover:bg-green-200 hover:px-1">{isToggle ? <EyeClosedIcon /> : <Eye />}</button>

        </div>

      </div>
    </>
  )
}


export default Child
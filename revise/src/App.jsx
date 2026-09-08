import { useState } from 'react';
import Buttons from './styles/buttons.module.css'
import Child from './Components/Child'
import Form from './Components/Form';
import Network from './Components/Network';
// import { Network } from 'lucide-react';

function App() {
  // How to pass State to a child component - you need to pass 'setSomething' as props to the child components
  const [balance, setBalance] = useState(568.45);

  // how to handle user events 
  // when you click the button the event variable is logges as 
  // syntheticBaseEvent object in the console. 
  // the syntheticBaseEvent is a built-in object used to interact with the 
  // native DOM events. Different browser has different implementation of the DOM 
  // Objects. So the syntheticBaseEvent makes React compatible with these browsers. 
  const eventHandle = (event) => {
    console.log(event)
  }

  return (
    <>
      <Child name="peter" balance={balance} setBalance={setBalance}/>
      <button onClick={eventHandle} className={Buttons.btnDanger}>Click</button>

      <div className='mt-5 px-10'>
        <h2 className='text-[22px] font-semibold underline'>Form Handling</h2>
        <Form />
      </div>

      <div className='mt-5 px-10 bg-gray-300 py-5'>
        <Network />
      </div>
    </>



  )
}

export default App

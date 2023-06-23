import React from 'react'
import { ACTIONS } from './Calculator'
const DigitButton = ({dispatch,digit}) => {
  function handleKeyPress (){
    
  }
  return (
    <button
      className="cursor-pointer text-2xl border-2 border-solid border-white bg-white/75 hover:bg-white/90"
      onClick={()=>dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

export default DigitButton
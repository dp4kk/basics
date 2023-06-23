import React from 'react'
import { ACTIONS } from './Calculator'
const OperationButton = ({dispatch,operation}) => {
  return (
    <button
      className="cursor-pointer text-2xl border-2 border-solid border-white bg-yellow-400/75 hover:bg-yellow-400/90"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}

export default OperationButton
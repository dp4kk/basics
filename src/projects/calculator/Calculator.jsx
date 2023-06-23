import React from 'react'
import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';


export const ACTIONS={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}

function reducer (state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          overwrite:false,
          currValue:payload.digit
        }
      }
      if(state.currValue=== '0' && payload.digit=== '0'){
         return state
      }
      if(payload.digit==='.' && state.currValue.includes('.')) {
        return state
      }
      return {
        ...state,
        currValue:`${state.currValue|| ''}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currValue==null && state.prevValue==null){
        return state
      }
      if(state.currValue==null){
        return{
          ...state,
          operation:payload.operation
        }
      }
      if(state.prevValue==null){
        return{
          ...state,
          prevValue:state.currValue,
          operation:payload.operation,
          currValue:null
        }
      }
      return{
        ...state,
        prevValue:evaluate(state),
        operation:payload.operation,
        currValue:null
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          currValue:null
        }
      }
      if(state.currValue==null){
        return state
      }
      if(state.currValue.length===1){
        return {
          ...state,
          currValue:null
        }
      }
        return {
          ...state,
          currValue:state.currValue.slice(0,-1)
        }
    case ACTIONS.EVALUATE: 
    if( state.currValue==null || state.prevValue==null || state.operation==null) {
      return state
    }
    return {
      ...state,
      overwrite:true,
      prevValue:null,
      operation:null,
      currValue:evaluate(state)
    }     
  }
}

function evaluate({prevValue,currValue,operation}){
      const previous=parseFloat(prevValue)
      const current=parseFloat(currValue)
    if (isNaN(previous) || isNaN(current)) return "";
    let result='';
    
    switch(operation){
    case "+":
          result=previous+current
    break
    case '-':
        result=previous-current
    break
    case '*':
      result=previous*current 
      break
    case '/': 
      result=previous/current 
      break
     
}
 return result.toString();
}

const INTEGER_FORMAT=new Intl.NumberFormat('en-us',{maximumFractionDigits:0})

function format(operand){
  if(operand==null) return
  const[integer,decimal]=operand.split('.')
  if(decimal==null) return INTEGER_FORMAT.format(integer)
  return `${INTEGER_FORMAT.format(integer)}.${decimal}`
}

const Calculator = () => {
  const [{prevValue,currValue,operation},dispatch]=useReducer(reducer,{})
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-cyan-300 to-blue-500">
      <div className="grid grid-cols-[repeat(4,6rem)] grid-rows-calcrows pt-12 justify-center">
        <div className="grid-cols-1 col-start-1 col-end-[-1]  bg-black/75 flex flex-col justify-around p-3 break-all items-end">
          <div className="text-white/75 text-base ">{format(prevValue)} {operation} </div>
          <div className="text-white text-lg">{currValue ? format(currValue) : 0}</div>
        </div>
        <button className="cursor-pointer text-2xl border-2 border-solid border-white bg-white/75 hover:bg-white/90 col-span-2" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>
          AC
        </button>
        <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})} className="cursor-pointer text-2xl border-2 border-solid border-white bg-white/75 hover:bg-white/90">
          Del
        </button>
        <OperationButton dispatch={dispatch} operation="/" />
        <DigitButton dispatch={dispatch} digit="1" />
        <DigitButton dispatch={dispatch} digit="2" />
        <DigitButton dispatch={dispatch} digit="3" />
        <OperationButton dispatch={dispatch} operation="*" />
        <DigitButton dispatch={dispatch} digit="4" />
        <DigitButton dispatch={dispatch} digit="5" />
        <DigitButton dispatch={dispatch} digit="6" />
        <OperationButton dispatch={dispatch} operation="+" />
        <DigitButton dispatch={dispatch} digit="7" />
        <DigitButton dispatch={dispatch} digit="8" />
        <DigitButton dispatch={dispatch} digit="9" />
        <OperationButton dispatch={dispatch} operation="-" />
        <DigitButton dispatch={dispatch} digit="." />
        <DigitButton dispatch={dispatch} digit="0" />
        <button className="cursor-pointer text-2xl border-2 border-solid border-white bg-yellow-400/75 hover:bg-yellow-400/90 col-span-2" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator
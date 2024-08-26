import { createContext, useState } from "react";

export let countercontext =  createContext()
export default function CounterContextProvider(props) {
     
  const [counter, setcounter] = useState(20)

  return ( 
  <countercontext.Provider value={ {counter , setcounter} }
  >
    {props.children}

  </countercontext.Provider> 
)}

import React, { useId } from "react";
import './Inputs.css'

function Input({ label, id, type = "text", onChange, kind }) {
  const generatedId = useId();
  
  return (
    <React.Fragment>
      {label && <label className={kind} htmlFor={id || generatedId}>{label}</label>}
      <input id={id || generatedId} type={type} onChange={onChange} placeholder={kind}/>
    </React.Fragment>
  );
}

export default Input;

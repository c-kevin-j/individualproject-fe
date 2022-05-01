import React from "react";

export default function Form(props) {

  const [input, setInput] = React.useState('')

  return <div>
    <fieldset>
      <legend>
        {props.title}
      </legend>
      <input type="text" onChange={(e)=>setInput(e.target.value)} />
      <button type="button" className="btn" onClick={()=>props.handleSubmit(input)}>Submit</button>
    </fieldset>

  </div>
}
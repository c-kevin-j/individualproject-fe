import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'

function EditPage (props) {

  return <div>
    <h1 className="text-2xl font-bold">Reset Password</h1>
    <div className="flex ">
      <div className="basis-1/4 my-auto">
          Input your email
      </div>
      <div className="basis-1">
        <input type="text" className="input input-bordered bg-white" placeholder="Input Email..."></input>
      </div>
    </div>
    <div>
      <button type="button" className="btn btn-sm btn-secondary">
        Reset
      </button>
    </div>
    <div>
      
    </div>
  </div>
}

EditPage.layout = "L1";

export default EditPage

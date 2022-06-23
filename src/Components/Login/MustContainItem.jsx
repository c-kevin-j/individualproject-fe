import React, {useState} from "react";
import { Checkbox, Form } from "react-daisyui";

//styling
// import './UpdatePasswordContainer.css';

const MustContainItem = (props) => {
  const { data } = props;
  const label = data[0];
  const meetsReq = data[1];

  const setClass = () => {
    const classArr = ["must-line"];
    if (meetsReq) classArr.push("cross-out");
    return classArr.join(" ");
  };

  return (
    <div className="MustContainItem">
      <div className="must-item">
        {/* <li className="must-text">{label}</li> */}
        {/* <Form className="w-64">
          <Form.Label title={label}>
            <Checkbox />
          </Form.Label>
        </Form> */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text text-xs">{label}</span>
            <input
              type="checkbox"
              disabled
              checked={meetsReq}
              readOnly
              className="checkbox-primary checkbox-xs"
            />
          </label>
        </div>
        <div className={setClass()}></div>
      </div>
    </div>
  );
};

export default MustContainItem;

import React, {useState} from "react";
import { Checkbox, Form } from "react-daisyui";

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
          <label className="label">
            <span className="label-text text-xs">{label}</span>
            <input
              type="checkbox"
              checked={meetsReq}
              readOnly
              className="checkbox checkbox-xs checkbox-primary"
            />
          </label>
        </div>
        <div className={setClass()}></div>
      </div>
    </div>
  );
};

export default MustContainItem;

import React, { useState } from "react";
import { Card, Button, Input } from "react-daisyui";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import MustContainItem from "./MustContainItem";

const UpdatePasswordContainer = (props) => {
  // form inputs
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  // booleans for password validations
  const [containsUL, setContainsUL] = useState(false); // uppercase letter
  const [containsLL, setContainsLL] = useState(false); // lowercase letter
  const [containsN, setContainsN] = useState(false); // number
  const [containsSC, setContainsSC] = useState(false); // special character
  const [contains8C, setContains8C] = useState(false); // min 8 characters
  const [passwordMatch, setPasswordMatch] = useState(false); // passwords match

  // checks all validations are true
  const [allValid, setAllValid] = useState(false);

  // labels and state boolean corresponding to each validation
  const mustContainData = [
    ["An uppercase letter (A-Z)", containsUL],
    ["A lowercase letter (a-z)", containsLL],
    ["A number (0-9)", containsN],
    ["A special character (!@#$)", containsSC],
    ["At least 8 characters", contains8C],
    ["Passwords match", passwordMatch],
  ];
  const [showPass, setShowPass] = useState(false);
  const [showConfirmedPass, setShowConfirmedPass] = useState(false);

  const validatePassword = () => {
    // has uppercase letter
    if (passwordOne.toLowerCase() != passwordOne) setContainsUL(true);
    else setContainsUL(false);

    // has lowercase letter
    if (passwordOne.toUpperCase() != passwordOne) setContainsLL(true);
    else setContainsLL(false);

    // has number
    if (/\d/.test(passwordOne)) setContainsN(true);
    else setContainsN(false);

    // has special character
    if (/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(passwordOne))
      setContainsSC(true);
    else setContainsSC(false);

    // has 8 characters
    if (passwordOne.length >= 8) setContains8C(true);
    else setContains8C(false);

    // passwords match
    if (passwordOne !== "" && passwordOne === passwordTwo)
      setPasswordMatch(true);
    else setPasswordMatch(false);

    // all validations passed
    if (
      containsUL &&
      containsLL &&
      containsN &&
      containsSC &&
      contains8C &&
      passwordMatch
    ) {
      setAllValid(true);
      props.handlePassword({'password':passwordOne, 'valid': true});
    }
    else {
      setAllValid(false);
      props.handlePassword({'password':passwordOne, 'valid': false});
    }
  };

  return (
    <div>
      {/* update password form */}
      <form>
        {/* password one */}
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <label className="input-group">
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Input password..."
            value={passwordOne}
            className="input input-bordered w-full bg-white"
            onChange={(e) => setPasswordOne(e.target.value)}
            onKeyUp={validatePassword}
          />
          <button type="button"
            className="btn btn-active btn-ghost text-white"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <AiFillEye className="text-white" />
              ) : (
              <AiFillEyeInvisible className="text-white" />
            )}
          </button>
        </label>
        

        {/* password two */}
        <div className="form-control mt-3">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <label className="input-group">
            <Input
              type={showConfirmedPass ? "text" : "password"}
              placeholder="Confirm password..."
              className="input input-bordered w-full bg-white"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
              onKeyUp={validatePassword}
            />
            <button type="button"
              className="btn btn-active btn-ghost text-white"
              onClick={() => setShowConfirmedPass(!showConfirmedPass)}
            >
              {showConfirmedPass ? (
                <AiFillEye className="text-white" />
                ) : (
                <AiFillEyeInvisible className="text-white" />
              )}
            </button>
          </label>
        </div>

        {/* input button */}
      </form>

      {/* create a MustContainItem for each password validation with props of label and boolean of state */}
      <div className="mt-4">
      <h4>Must contain:</h4>
        {mustContainData.map((data) => (
          <MustContainItem data={data} />
        ))}
      </div>
    </div>
  );
};

export default UpdatePasswordContainer;

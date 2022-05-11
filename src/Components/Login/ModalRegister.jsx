import React from "react";
import { Modal, Button, Input } from "react-daisyui";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function ModalRegister(props) {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [confirmedPass, setConfirmedPass] = React.useState("");
  const [showPass, setShowPass] = React.useState(false)
  const [showConfirmedPass, setShowConfirmedPass] = React.useState(false)


  const handleRegister = () => {
    if ( username === "" || email === "" || pass === "" || confirmedPass === ""){
      alert("Fill in all form");
    } else {
      if ( pass !== confirmedPass) {
        alert("Password not match");
      } else if (email.includes("@")) {
        alert("Registration success");
        props.toggleVisible();
      } else {
        alert("Email wrong");
      }
    }
  }

  return (
    <>
      <Modal open={props.visible} onClickBackdrop={props.toggleVisible}>
        <Modal.Header>Register</Modal.Header>

        <Modal.Body>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
              <Input
                type="text"
                placeholder="Input Email..."
                className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <Input
              type="text"
              placeholder="Input Username..."
              className="input input-bordered w-full"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <label class="input-group">
            <Input
              type={showPass?"text":"password"}
              placeholder="Input password..."
              className="input input-bordered w-full"
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="btn btn-active btn-ghost text-white" onClick={()=>setShowPass(!showPass)}>
              {showPass
              ?
              <AiFillEyeInvisible className="text-white"/>
              :
              <AiFillEye className="text-white" />
              }
            </button>
          </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <label class="input-group">
              <Input
                type={showConfirmedPass?"text":"password"}
                placeholder="Confirm password..."
                className="input input-bordered w-full"
                onChange={(e) => setConfirmedPass(e.target.value)}
              />
              <button className="btn btn-active btn-ghost text-white" onClick={()=>setShowConfirmedPass(!showConfirmedPass)}>
              {showConfirmedPass
              ?
              <AiFillEyeInvisible className="text-white"/>
              :
              <AiFillEye className="text-white" />
              }
              </button>
            </label>

          </div>
        </Modal.Body>

        <Modal.Actions>
          <Button onClick={handleRegister} color="primary">
            Accept
          </Button>
          <Button onClick={props.toggleVisible}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </>
  ); 
}

export default ModalRegister
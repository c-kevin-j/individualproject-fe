import React from "react";
import { Modal, Button, Input } from "react-daisyui";

function ModalRegister(props) {
 const [id, setId] = React.useState("");
 const [username, setUsername] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [confirmedPass, setConfirmedPass] = React.useState("");

  return (
    <>
      <Modal open={props.visible} onClickBackdrop={props.toggleVisible}>
        <Modal.Header>Register</Modal.Header>

        <Modal.Body>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <Input
            type="text"
            placeholder="placeholder"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setId(e.target.value)}
          ></Input>
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <Input
            type="text"
            placeholder="placeholder"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <Input
            type="text"
            placeholder="placeholder"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setPass(e.target.value)}
          ></Input>
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <Input
            type="text"
            placeholder="placeholder"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setConfirmedPass(e.target.value)}
          ></Input>
        </Modal.Body>

        <Modal.Actions>
          <Button onClick={props.toggleVisible} color="primary">
            Accept
          </Button>
          <Button onClick={props.toggleVisible}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </>
  ); 
}

export default ModalRegister
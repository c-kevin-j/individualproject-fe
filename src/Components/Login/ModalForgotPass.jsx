import React from "react";
import { Modal, Input } from "react-daisyui";

function ModalForgotPass(props) {
  const [id, setId] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [confirmedPass, setConfirmedPass] = React.useState("");

  return (
    <>
      <Modal open={props.visible} onClickBackdrop={props.toggleVisible}>
        <Modal.Header>Lorem Ipsum</Modal.Header>

        <Modal.Body>
          <label className="label">
            <span className="label-text">Email/Username {id} {pass} {confirmedPass}</span>
          </label>
          <Input
            type="text"
            placeholder="Insert Email/Username..."
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setId(e.target.value)}
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
          <button class="btn" onClick={props.toggleVisible} color="primary">
            Accept
          </button>
          <button class="btn" onClick={props.toggleVisible}>Cancel</button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ModalForgotPass
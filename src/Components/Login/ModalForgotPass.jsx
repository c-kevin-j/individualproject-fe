import React from "react";
import { Modal, Input } from "react-daisyui";
import Axios from "axios";
import { API_URL } from "../../../helper";

function ModalForgotPass(props) {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [confirmedPass, setConfirmedPass] = React.useState("");

  const handleForgotPassword = async () => {
    try {
      let res = await Axios.get(`${API_URL}/users?email=${email}`)
      if (res.data.length>0){
        props.toggleVisible();
        alert("Email konfirmasi telah terkirim ke alamat email Anda")
      } else {
        alert("Email tidak terdaftar")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal open={props.visible} onClickBackdrop={props.toggleVisible}>
        <Modal.Header>Forgot Password</Modal.Header>

        <Modal.Body>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <Input
            type="text"
            placeholder="Insert Email..."
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          {/* <label className="label">
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
          ></Input> */}
        </Modal.Body>

        <Modal.Actions>
          <button class="btn" onClick={handleForgotPassword} color="primary">
            Accept
          </button>
          <button class="btn" onClick={props.toggleVisible}>Cancel</button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ModalForgotPass
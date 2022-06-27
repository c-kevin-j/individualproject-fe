import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-daisyui";
import { FaSpinner } from "react-icons/fa";
import ModalAlert from "../Components/ModalAlert";
import TestModal from "../Components/Posts/Modal";
import ModalCreatePost from "../Components/Posts/ModalCreatePost";

const VerifyAccountPage = () => {
  const [visible, setVisible] = useState(false);
  const button = () => {
    setVisible(!visible);
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const [open, setOpen] = useState(false);
  const [modal2, setModal2] = useState(false);

  return (
    <>
      <div className="px-10 md:px-32 lg:px-48 xl:px-80 pt-5 text-center space-y-6">
        <div>Akun anda belum diverifikasi</div>
        <div>
          <button type="button" className="btn" onClick={() => setOpen(true)}>
            alert
          </button>
          <Modal open={open} className="w-1/2 p-5 bg-base-100">
            <Button onClick={()=>setModal2(true)}>Ok</Button>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Modal open={modal2} className="z-10 w-3/4 p-5 bg-base-200">
              <Button onClick={() => setModal2(false)}>close2</Button>
            </Modal>
          </Modal>
          {/* <ModalCreatePost
            visible={visible}
            toggleVisible={() => setVisible(!visible)}
          /> */}
          <FaSpinner className="icon-spin" size={70} />
        </div>

        <Button onClick={toggleVisible}>Open Modal</Button>
      </div>
      <ModalAlert
        visible={visible}
        toggleVisible={() => toggleVisible()}
        title="title"
        text="hello"
        icon="success"
      />
    </>
  );
};

VerifyAccountPage.layout = "L1";

export default VerifyAccountPage;

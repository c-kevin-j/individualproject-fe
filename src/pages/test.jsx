import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-daisyui";
import { FaLink, FaSpinner } from "react-icons/fa";
import ModalAlert from "../Components/ModalAlert";
import ModalConfirm from "../Components/ModalConfirm";
import ModalCreatePost from "../Components/Posts/ModalCreatePost";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareCount,
} from "react-share";
import { useRouter } from "next/router";
import { API_URL } from "../../helper";
import MetaTag from "../Components/HeadMeta"

const VerifyAccountPage = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const shareUrl = `localhost:3000${router.pathname}`;
  const button = () => {
    setVisible(!visible);
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const toggleConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

  const [bool, setBool] = useState(false);
  const testClick = () => {
    setBool(!bool);
  };

  const [open, setOpen] = useState(false);
  const [modal2, setModal2] = useState(false);

  return (
    <>
      <MetaTag
        title="Kartoffel"
        description="Look at this image"
        image="https://apollo-singapore.akamaized.net/v1/files/3f7mz5xjs42v2-ID/image;s=850x0"
      />
      <div className="px-10 md:px-32 lg:px-48 xl:px-80 pt-5 text-center space-y-6">
        <div>Akun anda belum diverifikasi</div>
        <div>
          <button type="button" className="btn" onClick={() => setOpen(true)}>
            alert
          </button>
          <Modal open={open} className="w-1/2 p-5 bg-base-100">
            <Button onClick={() => setModal2(true)}>Ok</Button>
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

        <Button onClick={toggleVisible}>Open Modal Alert</Button>
        <Button onClick={toggleConfirm}>Open Modal Confirm</Button>
        <div>{bool && <div>HELLOO</div>}</div>
      </div>
      <ModalAlert
        visible={visible}
        toggleVisible={() => toggleVisible()}
        title="title"
        text="hello"
        icon="success"
      />
      <ModalConfirm
        visible={openConfirm}
        toggleVisible={() => toggleConfirm()}
        title="title"
        text="hello"
        onClick={testClick}
      />

      <div>
        REACT SHARE
        <div>
          <FacebookShareButton url={shareUrl} quote={"hello"}>
            <FacebookIcon size="40" round={true} />
          </FacebookShareButton>
          <FaLink size="40" />
          {/* <FacebookShareCount url={shareUrl}>
            {(shareCount) => (
              <span className="myShareCountWrapper">{shareCount}</span>
            )}
          </FacebookShareCount> */}
          <TwitterShareButton url={shareUrl} quote={"hello"}>
            <TwitterIcon size="40" round={true} />
          </TwitterShareButton>
          <FaLink size="40" />
        </div>
      </div>
    </>
  );
};

VerifyAccountPage.layout = "L1";

export default VerifyAccountPage;

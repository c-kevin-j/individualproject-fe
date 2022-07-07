import React, { useState } from "react";
import { Modal } from "react-daisyui";
import { AiFillCopy } from "react-icons/ai";
import { TiThumbsOk } from "react-icons/ti";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const ModalSharePost = (props) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.shareUrl);
    setNotifVisible(true);
    setTimeout(() => {
      setNotifVisible(false);
    }, 3000);
  };

  const [notifVisible, setNotifVisible] = useState(false);
  const handleButtonCopy = () => {};

  return (
    <>
      <Modal
        className="bg-base-300 p-3 pb-8 w-1/2 lg:w-1/3 rounded space-y-3"
        open={props.visible}
        onClickBackdrop={props.toggleVisible}
      >
        <div className="flex justify-center gap-x-2 p-1">
          <FacebookShareButton url={props.shareUrl} quote={"hello"}>
            <FacebookIcon size="40" round={true} />
          </FacebookShareButton>
          <WhatsappShareButton url={props.shareUrl} quote={"hello"}>
            <WhatsappIcon size="40" round={true} />
          </WhatsappShareButton>
          <TwitterShareButton url={props.shareUrl} quote={"hello"}>
            <TwitterIcon size="40" round={true} />
          </TwitterShareButton>
        </div>
        <div className="input-group border rounded-lg">
          <input
            type="text"
            className="w-full rounded focus:ring-none p-2 bg-white"
            value={props.shareUrl}
            readonly
          />
          <button
            type="button"
            className="bg-base-200"
            onClick={copyToClipboard}
          >
            <AiFillCopy className="w-10 " />
          </button>
        </div>
        <div className="flex h-2 relative -top-3 italic text-xs justify-end">
          {notifVisible && (
            <>
              <TiThumbsOk size={40} /> url copied
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalSharePost;

import React, { useState } from "react";
import { Modal } from "react-daisyui";
import {
  AiFillCheckCircle,
  AiFillWarning,
  AiFillExclamationCircle,
} from "react-icons/ai";
import { BsFillXCircleFill } from "react-icons/bs";

const ModalConfirm = (props) => {
  let titleColor = "";
  let icon = () => {
    if (props.icon === "success") {
      titleColor = "text-success-content";
      return <AiFillCheckCircle className="text-success" size={70} />;
    } else if (props.icon === "error") {
      titleColor = "text-error-content";
      return <BsFillXCircleFill className="text-error" size={70} />;
    } else {
      return null;
    }
  };

  const handleClick = () => {
    props.toggleVisible();
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <Modal
      className="bg-base-100 p-3 w-1/2 lg:w-1/3"
      open={props.visible}
      onClickBackdrop={props.toggleVisible}
    >
      <div className="w-full">
        <div className="flex justify-center">
          <AiFillExclamationCircle className="text-warning" size={70} />
        </div>
        <div
          className={`pt-2 text-center text-2xl font-semibold text-warning-content`}
        >
          {props.title}
        </div>
        <div className="py-2 text-center font-medium text-base">
          {props.text}
        </div>
      </div>
      <div className="grid grid-cols-2 pt-2 gap-x-3">
        <button
          type="button"
          className="btn btn-sm col-span-1 rounded btn-primary"
          onClick={handleClick}
        >
          Yes
        </button>
        <button
          type="button"
          className="btn btn-sm col-span-1 rounded"
          onClick={props.toggleVisible}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;

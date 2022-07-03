import React, { useState } from "react";
import { Modal } from "react-daisyui";
import { AiFillCheckCircle, AiFillWarning } from "react-icons/ai";
import { BsFillXCircleFill } from "react-icons/bs";

const ModalAlert = (props) => {
  let titleColor = ""
  let icon = () => {
    if (props.icon === "success") {
      titleColor="text-success-content"
      return <AiFillCheckCircle className="text-success" size={70} />;
    } else if (props.icon === "error") {
      titleColor="text-error-content"
      return <BsFillXCircleFill className="text-error" size={70} />;
    } else {
      return null;
    }
  };

  const handleClick = () => {
    props.toggleVisible()
    if(props.onClick){
      props.onClick()
    }
  }

  let width
  if (props.width){
    width = `w-${props.width}`
  } else {
    width = `w-1/2 lg:w-1/3`
  }


  return (
    <Modal
      className={`bg-base-100 p-3 ${width} z-10`}
      open={props.visible}
      onClickBackdrop={props.toggleVisible}
    >
      <div className="w-full">
        <div className="flex justify-center">{icon()}</div>
        <div className={`pt-2 text-center text-2xl font-semibold ${titleColor}`}>
          {props.title}
        </div>
        <div className="py-2 text-center font-medium text-base">{props.text}</div>
      </div>
      <div className="text-center pt-2">
        <button
          type="button"
          className="btn btn-sm btn-secondary w-full rounded"
          onClick={handleClick}
        >
          OK
        </button>
      </div>
    </Modal>
  );
};

export default ModalAlert;

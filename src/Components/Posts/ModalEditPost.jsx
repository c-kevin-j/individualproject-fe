import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Modal } from "react-daisyui";
import { API_URL } from "../../../helper";
import ModalAlert from "../ModalAlert";

const ModalEditPost = (props) => {
  const router = useRouter();

  const [caption, setCaption] = useState(props.caption);

  // modal alert visiblity
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    icon: "",
    title: "",
    text: "",
    onClick: null,
  });

  const toggleAlert = () => {
    setVisible(!visible);
  };

  const handleSave = async () => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await axios.patch(
        `${API_URL}/posts/edit`,
        {
          id: props.postId,
          caption,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        setModalContent({
          icon: "success",
          title: "Success!",
          text: "Your post is updated",
          onClick: () => {
            props.toggleVisible();
            window.location.reload();
          },
        });
        toggleAlert();

        // alert(`update berhasil`);
        // props.toggleVisible();
        // router.push(`/post?id=${props.postId}`);
      }
    } catch (error) {
      setModalContent({
        icon: "error",
        title: "Error!",
        text: "Please try again",
      });
      console.log(error);
    }
  };

  const handleCancel = () => {
    setCaption(props.caption);
    props.toggleVisible();
  };

  return (
    <Modal
      className="bg-base-300 p-2 w-1/2 lg:w-1/3 rounded"
      open={props.visible}
      onClickBackdrop={props.toggleVisible}
    >
      <div className="space-y-3">
        <div className="form-control w-full ">
          <label className="text-center text-base font-semibold">
            Edit Caption
          </label>
        </div>
        <div>
          <textarea
            type="text"
            placeholder="Insert caption"
            className="input input-bordered w-full rounded h-[25vh]"
            defaultValue={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="text-right space-x-3">
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={handleSave}
          >
            Save
          </button>
          <button type="button" className="btn btn-md" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
      <ModalAlert
        visible={visible}
        toggleVisible={() => toggleAlert()}
        icon={modalContent.icon}
        title={modalContent.title}
        text={modalContent.text}
        onClick={modalContent.onClick}
        width="full"
      />
    </Modal>
  );
};

export default ModalEditPost;

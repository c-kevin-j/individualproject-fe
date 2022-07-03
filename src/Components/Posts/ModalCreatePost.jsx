import React, { useState } from "react";
import { Modal, Button } from "react-daisyui";
import { AiFillCamera } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "../../../helper";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ModalAlert from "../ModalAlert";

function ModalCreatePost(props) {
  const router = useRouter();

  const { user } = useSelector((state) => {
    return {
      user: state.usersReducer.user,
    };
  });

  const filePickerRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputKey, setInputKey] = useState(null);
  const [loading, setLoading] = useState(null);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  // modal alert visiblity
  const [alert, setAlert] = useState(false);
  const [modalContent, setModalContent] = useState({
    icon: "",
    title: "",
    text: "",
    onClick: null,
  });

  const toggleAlert = () => {
    setAlert(!alert);
  };

  function addImageToPost(event) {
    setImage(event.target.files[0]);
    const reader = new FileReader();
    //cek apakah ada file yang diupload
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }

  function removeUploadedFile() {
    setSelectedFile(null);
    //key diubah untuk mereset file yang sudah diupload ke dalam input
    //menggunakan date supaya menghasilkan key yang berbeda-beda
    setInputKey(Date.now);
  }

  async function uploadPost(event) {
    try {
      let token = localStorage.getItem("tokenIdUser");
      if (loading) return;
      setLoading(true);

      // axios backend
      let formPost = new FormData();
      let data = {
        user_id: user.id,
        caption: caption,
      };
      ///////////////////
      // menambahkan data ke dalam formPost
      formPost.append("data", JSON.stringify(data));
      // menambahkan image
      formPost.append("image", image);
      let res = await axios.post(`${API_URL}/posts/add`, formPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) {
        removeUploadedFile()
        setAlert(true)
        setModalContent({
          icon: "success",
          title: "SUCCESS!",
          text: "Your post is uploaded",
          onClick: () => {
            if (router.pathname === "/") {
              props.toggleVisible();
              window.location.reload();
            } else {
              props.toggleVisible();
              router.push("/");
            }
          },
        });
      }
    } catch (error) {
      setAlert(true)
      setModalContent({
        icon: "error",
        title: "ERROR!",
        text: "Please try again",
      });
      console.log(error);
    }
  }

  return (
    <>
      <Modal
        className="bg-base-300 p-2"
        open={props.visible}
        onClickBackdrop={props.toggleVisible}
      >
        <div className="flex place-content-center bg-base-content">
          {selectedFile ? (
            <>
              <img
                onClick={removeUploadedFile}
                src={selectedFile}
                alt="Uploaded"
                className="max-w-[400px] max-h-[400px] object-cover cursor-pointer"
              />
            </>
          ) : (
            <>
              <div className="w-[250px] h-[250px] flex items-center place-content-center">
                <div className="flex cursor-pointer w-10 h-10 bg-blue-200 rounded-full border-2 text-blue-500 ">
                  <AiFillCamera
                    onClick={() => filePickerRef.current.click()}
                    className="m-auto"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <input
          type="text"
          maxLength="150"
          placeholder="Insert your caption..."
          className="my-4 border-none text-center w-full input-md focus:ring-0 bg-white"
          onChange={(e) => setCaption(e.target.value)}
        />

        <input
          type="file"
          hidden
          ref={filePickerRef}
          key={inputKey || ""}
          onChange={addImageToPost}
        />

        <Link href="/">
          <button
            disabled={!selectedFile || loading}
            type="button"
            onClick={uploadPost}
            className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 
          disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
          >
            Upload Post
          </button>
        </Link>

        <ModalAlert
          visible={alert}
          toggleVisible={() => toggleAlert()}
          icon={modalContent.icon}
          title={modalContent.title}
          text={modalContent.text}
          onClick={modalContent.onClick}
          width="full"
        />
      </Modal>
    </>
  );
}

export default ModalCreatePost;

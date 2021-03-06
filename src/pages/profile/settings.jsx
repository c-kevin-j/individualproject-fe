import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, loginAction } from "../../Redux/Actions/userAction";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUserCircle, FaLock, FaImage, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../helper";
import { useRouter } from "next/router";
import UpdatePasswordContainer from "../../Components/Login/UpdatePasswordContainer";
import ModalAlert from "../../Components/ModalAlert";

const EditProfilePage = (props) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { user } = useSelector((state) => {
    return {
      user: state.usersReducer.user,
    };
  });

  const filePickerRef = React.useRef(null);
  const [inputKey, setInputKey] = useState(null);
  const [loading, setLoading] = useState(null);

  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const oldUsername = user.username;
  const [editUsername, setEditUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formChanged, setFormChanged] = useState(false);

  // selectedFile refers to profile picture
  const [selectedFile, setSelectedFile] = useState(null);
  const [editProfilePicture, setEditProfilePicture] = useState("");
  const [pictureChanged, setPictureChanged] = useState(false);

  const [editBio, setEditBio] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [valid, setValid] = useState(false);

  // modal alert visiblity
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    icon: "",
    title: "",
    text: "",
    onClick: null,
  });
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const selectTab = (tab) => {
    setSelectedTab(tab);
  };

  const dispatch = useDispatch();

  //functions untuk mengubah profile photo
  function addImageToPost(event) {
    setEditProfilePicture(event.target.files[0]);

    const reader = new FileReader();
    //cek apakah ada file yang diupload
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setPictureChanged(true);
      setSelectedFile(readerEvent.target.result);
    };
  }

  function removeUploadedFile() {
    setSelectedFile(null);
    //key diubah untuk mereset file yang sudah diupload ke dalam input
    //setInputKeymenggunakan date supaya menghasilkan key yang berbeda-beda
    Date.now;
  }

  //dijalankan setelah variabel user mengalami perubahan
  React.useEffect(() => {
    setInitialForm();
  }, [user]);

  const setInitialForm = () => {
    setEditFirstName(user.first_name);
    setEditLastName(user.last_name);
    setEditUsername(user.username);
    oldUsername = user.username;
    setEditBio(user.bio);
    setSelectedFile(user.profile_picture);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      let token = localStorage.getItem("tokenIdUser");
      let formEdit = {};
      if (selectedTab === 1) {
        formEdit = {
          username: editUsername,
          first_name: editFirstName,
          last_name: editLastName,
          bio: editBio,
        };

        let res = await axios.patch(
          `${API_URL}/users/edit`,
          {
            id: user.id,
            oldUsername,
            ...formEdit,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          dispatch(editUser({ user: { ...user, ...formEdit } }));
          localStorage.setItem("tokenIdUser", res.data.token);
          setModalContent({
            icon: "success",
            title: "Success!",
            text: "Your profile has been updated",
            onClick: () => router.push(`/profile?id=${user.id}`),
          });
          toggleVisible();
          setIsSubmitting(false);
        } else {
          setModalContent({
            icon: "error",
            title: "Error!",
            text: "Username is already used",
          });
          toggleVisible();
          setIsSubmitting(false);
        }
      } else if (selectedTab === 2) {
        // res backend
        let formData = new FormData();
        formData.append("data", JSON.stringify({ id: user.id }));
        formData.append("image", editProfilePicture);

        //axios backend
        let res = await axios.patch(
          `${API_URL}/users/edit/profile_picture`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res) {
          dispatch(editUser({ user: { ...user, editProfilePicture } }));
          localStorage.setItem("tokenIdUser", res.data.token);
          setModalContent({
            icon: "success",
            title: "Success!",
            text: "Your profile picture has been updated",
            onClick: () => router.push(`/profile?id=${user.id}`),
          });
          toggleVisible();
          setIsSubmitting(false);
        }
      } else if (selectedTab === 3) {
        // res backend
        let res = await axios.patch(
          `${API_URL}/users/edit/password`,
          {
            id: user.id,
            oldPassword,
            newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          setModalContent({
            icon: "success",
            title: "Success!",
            text: "Your password has been updated",
            onClick: () => router.push(`/profile?id=${user.id}`),
          });
          toggleVisible();
          setIsSubmitting(false);
        } else {
          setModalContent({
            icon: "error",
            title: "Error!",
            text: res.data.message,
          });
          toggleVisible();
          setIsSubmitting(false);
        }
      }
    } catch (error) {
      console.log(error);
      setModalContent({
        icon: "error",
        title: "Error!",
        text: "Please try again",
      });
      toggleVisible();
      setIsSubmitting(false);
    }
  };

  const printSetting = () => {
    if (selectedTab === 1) {
      return <>{userSetting()}</>;
    } else if (selectedTab === 2) {
      return <>{profilePictureSetting()}</>;
    } else if (selectedTab === 3) {
      return <>{passwordSetting()}</>;
    }
  };

  const userSetting = () => {
    return (
      <div className="grid grid-cols-12 items-center gap-2">
        <div className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 font-bold">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className="inline input input-bordered w-full bg-white"
            defaultValue={editUsername}
            onChange={(e) => {
              setEditUsername(e.target.value);
              setFormChanged(true);
            }}
          />
        </div>

        <div className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 font-bold">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="inline input input-bordered w-full bg-white"
            defaultValue={editFirstName}
            onChange={(e) => {
              setEditFirstName(e.target.value);
              setFormChanged(true);
            }}
          />
        </div>

        <div className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 font-bold">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="inline input input-bordered w-full bg-white"
            defaultValue={editLastName}
            onChange={(e) => {
              setEditLastName(e.target.value);
              setFormChanged(true);
            }}
          />
        </div>

        <div className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 font-bold">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            disabled
            type="text"
            placeholder="Email"
            className="inline input input-bordered w-full"
            defaultValue={user.email}
          />
        </div>

        <div className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 font-bold">
          <label className="label">
            <span className="label-text">Bio</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full bg-white"
            placeholder="Bio"
            defaultValue={editBio}
            onChange={(e) => {
              setEditBio(e.target.value);
              setFormChanged(true);
            }}
          ></textarea>
        </div>

        <div className="col-start-10 text-end">
          <button
            type="button"
            className="btn btn-secondary w-24"
            onClick={handleSubmit}
            disabled={!formChanged || isSubmitting}
          >
            {isSubmitting ? <FaSpinner className="icon-spin" /> : "Submit"}
          </button>
        </div>
      </div>
    );
  };

  const profilePictureSetting = () => {
    return (
      <div className="grid grid-cols-1 justify-items-center gap-y-2">
        <div className="flex items-center h-min">
          <div className="avatar">
            <div className=" w-32 rounded-full my-auto mx-auto">
              <img
                className=""
                style={{ cursor: "pointer" }}
                src={
                  !pictureChanged
                    ? `${API_URL}${selectedFile}`
                    : `${selectedFile}`
                }
                onClick={() => filePickerRef.current.click()}
              />
            </div>
          </div>
        </div>
        <div>
          <a
            className="link link-hover text-sky-400"
            onClick={() => filePickerRef.current.click()}
          >
            Change Profile Photo
          </a>
        </div>
        <input
          hidden
          type="file"
          ref={filePickerRef}
          key={inputKey || ""}
          onChange={addImageToPost}
        />
        <div className="">
          <button
            className="btn btn-secondary"
            onClick={handleSubmit}
            disabled={!pictureChanged || isSubmitting}
          >
            {isSubmitting ? <FaSpinner className="icon-spin" /> : "Submit"}
          </button>
        </div>
      </div>
    );
  };

  const handlePassword = (childData) => {
    const password = childData["password"];
    const valid = childData["valid"];
    setNewPassword(password);
    setValid(valid);
  };

  const passwordSetting = () => {
    return (
      <div className="grid grid-cols-12 items-center gap-3">
        <div className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 font-bold">
          <label className="label">
            <span className="label-text">Old Password</span>
          </label>
          <label className="input-group">
            <input
              type={showPass ? "text" : "password"}
              className="inline input input-bordered w-full bg-white"
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Input your old Password..."
            />
            <button
              className="btn btn-active btn-primary text-white"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <AiFillEye className="text-white" />
              ) : (
                <AiFillEyeInvisible className="text-white" />
              )}
            </button>
          </label>
        </div>

        <span className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 font-bold">
          <UpdatePasswordContainer handlePassword={handlePassword} />
        </span>

        <div className="col-start-10 text-end">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSubmit}
            disabled={!oldPassword || !newPassword || !valid || isSubmitting}
          >
            {isSubmitting ? <FaSpinner className="icon-spin" /> : "Submit"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-12 pb-5">
        <div className="justify-center col-start-2 col-span-10 md:col-start-3 md:col-span-8 border-b-2 border-primary-focus h-20 sm:h-fit">
          <div className="tabs my-3 grid grid-cols-3 justify-items-center">
            <div>
              <a
                className={`text-base tab grid justify-items-center ${
                  selectedTab === 1 &&
                  "tab-active text-secondary-content font-bold"
                } gap-1`}
                onClick={() => selectTab(1)}
              >
                <FaUserCircle />
                Edit Profile
              </a>
            </div>
            <div>
              <a
                className={`text-base tab grid justify-items-center ${
                  selectedTab === 2 &&
                  "tab-active text-secondary-content font-bold"
                } gap-1`}
                onClick={() => selectTab(2)}
              >
                <FaImage />
                Profile Picture
              </a>
            </div>
            <div>
              <a
                className={`text-base tab grid justify-items-center ${
                  selectedTab === 3 &&
                  "tab-active text-secondary-content font-bold"
                } gap-1`}
                onClick={() => selectTab(3)}
              >
                <FaLock />
                Password
              </a>
            </div>
          </div>
          <ModalAlert
            visible={visible}
            toggleVisible={() => toggleVisible()}
            icon={modalContent.icon}
            title={modalContent.title}
            text={modalContent.text}
            onClick={modalContent.onClick}
          />
        </div>
        <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 pt-5">
          <div className="form-control">{printSetting()}</div>
        </div>
      </div>
    </>
  );
};

EditProfilePage.layout = "L1";

export default EditProfilePage;

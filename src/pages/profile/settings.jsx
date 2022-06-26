import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, loginAction } from "../../Redux/Actions/userAction";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUserCircle, FaLock } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../helper";
import { useRouter } from "next/router";
import UpdatePasswordContainer from "../../Components/Login/UpdatePasswordContainer";
import Swal from 'sweetalert2/dist/sweetalert2.js'

const EditProfilePage = (props) => {
  const [selectedTab, setSelectedTab] = useState(1);

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
  const [editUsername, setEditUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formChanged, setFormChanged] = useState(false)

  // selectedFile refers to profile picture
  const [selectedFile, setSelectedFile] = useState(null);
  const [editProfilePicture, setEditProfilePicture] = useState("");
  const [pictureChanged, setPictureChanged] = useState(false);

  const [editBio, setEditBio] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmedPass, setShowConfirmedPass] = useState(false);
  const [validateForm, setValidateForm] = useState(true);
  const [valid, setValid] = useState(false);

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
    setEditBio(user.bio);
    setSelectedFile(user.profile_picture);
  };

  const handleSubmit = async () => {
    try {
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
            ...formEdit,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          alert("Update berhasil");
          dispatch(editUser({ user: { ...user, ...formEdit } }));
          localStorage.setItem("tokenIdUser", res.data.token);
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
          alert("Update berhasil");
          dispatch(editUser({ user: { ...user, editProfilePicture } }));
          localStorage.setItem("tokenIdUser", res.data.token);
          location.reload()
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
          alert(res.data.message);
          dispatch(editUser({ ...user, password }));
        } else {
          alert(res.data.message);
        }
      }

      router.push(`/profile?id=${user.id}`);
    } catch (error) {
      console.log(error);
      // alert(error.response.data.message);
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
            className="inline input input-bordered w-full"
            defaultValue={editUsername}
            onChange={(e) => {setEditUsername(e.target.value); setFormChanged(true)}}
          />
        </div>

        <div className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 font-bold">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="inline input input-bordered w-full"
            defaultValue={editFirstName}
            onChange={(e) => {setEditFirstName(e.target.value); setFormChanged(true)}}
          />
        </div>

        <div className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 font-bold">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="inline input input-bordered w-full"
            defaultValue={editLastName}
            onChange={(e) => {setEditLastName(e.target.value); setFormChanged(true)}}
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
            className="textarea textarea-bordered w-full"
            placeholder="Bio"
            defaultValue={editBio}
            onChange={(e) => {setEditBio(e.target.value); formChanged=true}}
          ></textarea>
        </div>

        <div className="col-start-10 text-end">
          <button type="button" className="btn" onClick={handleSubmit} disabled={!formChanged}>
            Submit
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
          <button className="btn" onClick={handleSubmit} disabled={!pictureChanged}>
            Submit
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
              className="inline input input-bordered w-full"
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Input your old Password..."
            />
            <button
              className="btn btn-active btn-ghost text-white"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <AiFillEyeInvisible className="text-white" />
              ) : (
                <AiFillEye className="text-white" />
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
            className="btn"
            onClick={handleSubmit}
            disabled={!oldPassword || !newPassword || !valid}
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-12 pt-4">
        <div className="justify-center col-start-2 col-span-10 md:col-start-3 md:col-span-8">
          <div className="tabs my-3 border-b-2 grid grid-cols-3 justify-items-center">
            <a
              className={`text-base tab ${
                selectedTab === 1 && "tab-active text-secondary font-bold"
              } gap-1`}
              onClick={() => selectTab(1)}
            >
              <FaUserCircle />
              Edit Profile
            </a>
            <a
              className={`text-base tab ${
                selectedTab === 2 && "tab-active text-secondary font-bold"
              } gap-1`}
              onClick={() => selectTab(2)}
            >
              <FaUserCircle />
              Profile Picture
            </a>
            <a
              className={`text-base tab ${
                selectedTab === 3 && "tab-active text-secondary font-bold"
              } gap-1`}
              onClick={() => selectTab(3)}
            >
              <FaLock />
              Change Password
            </a>
          </div>
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

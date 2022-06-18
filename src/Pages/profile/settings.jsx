import React, { Profiler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, loginAction } from "../../Redux/Actions/userAction";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUserCircle, FaLock } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../helper";
import { useRouter } from "next/router";

const EditProfilePage = (props) => {
  const [selectedTab, setSelectedTab] = React.useState(1);

  const router = useRouter()
  const { user } = useSelector((state) => {
    return {
      user: state.usersReducer.user,
    };
  });

  const filePickerRef = React.useRef(null);
  const [inputKey, setInputKey] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  const [editFirstName, setEditFirstName] = React.useState("");
  const [editLastName, setEditLastName] = React.useState("");
  const [editUsername, setEditUsername] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confNewPassword, setConfNewPassword] = React.useState("");

  // selectedFile refers to profile picture
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [editProfilePicture, setEditProfilePicture] = React.useState("");
  const [pictureChanged, setPictureChanged] = React.useState(false);

  const [editBio, setEditBio] = React.useState("");

  const [showPass, setShowPass] = React.useState(false);
  const [showNewPass, setShowNewPass] = React.useState(false);
  const [showConfirmedPass, setShowConfirmedPass] = React.useState(false);
  const [validateForm, setValidateForm] = React.useState(true);

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
      let formEdit = {};
      if (selectedTab === 1) {
        formEdit = {
          username: editUsername,
          first_name: editFirstName,
          last_name: editLastName,
          bio: editBio,
        };
        // // res fakeserver
        // let res = await axios.patch(`${API_URL}/users/${user.id}`, {
        //   id: user.id,
        //   ...formEdit,
        // });

        // res backend
        let res = await axios.patch(`${API_URL}/users/edit`, {
          id: user.id,
          ...formEdit,
        });
        if (res) {
          alert("Update berhasil");
          dispatch(editUser({ user: { ...user, ...formEdit } }));
        }
      } else if (selectedTab === 2) {
        // formEdit = {
        //   profile_picture: profilePicture,
        // };
        // res backend
        let formData = new FormData();
        formData.append("data", JSON.stringify({ id: user.id }));
        formData.append("image", editProfilePicture);

        // // axios json server
        // let res = await axios.patch(`${API_URL}/users/edit/profile_picture`, {
        //   id: user.id,
        //   profile_picture: editProfilePicture,
        // });

        //axios backend
        let res = await axios.patch(
          `${API_URL}/users/edit/profile_picture`,
          formData
        );

        if (res) {
          alert("Update berhasil");
          dispatch(editUser({ user: { ...user, editProfilePicture } }));
        }
      } else if (selectedTab === 3) {
        // // res fake backend
        // if (oldPassword === user.password) {
        //   if (newPassword === confNewPassword) {
        //     setValidateForm(true);
        //     formEdit = {
        //       ...formEdit,
        //       password: newPassword,
        //     };
        //   } else {
        //     alert("konfirmasi password baru salah");
        //     setValidateForm(false);
        //   }
        // } else {
        //   alert("Password lama tidak sesuai");
        //   setValidateForm(false);
        // }

        // res backend
        let res = await axios.patch(`${API_URL}/users/edit/password`, {
          id: user.id,
          oldPassword,
          newPassword,
        });
        console.log(res.data)
        if (res.data.success) {
          alert(res.data.message);
          dispatch(editUser({ ...user, password }));
        } else {
          alert(res.data.message);
        }
      }
      
      // if (validateForm === true) {
      //   let res = await axios.patch(`${API_URL}/users/${user.id}`, {
      //     ...formEdit,
      //   });
      //   if (res) {
      //     alert("Update berhasil");
      //     dispatch(editUser({ user: formEdit }));
      //   }
      // }
      router.push('/profile/settings')
    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
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
        {/* <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          Profile Picture
        </span>
        <div className="col-start-2 col-span-12 md:col-span-8 flex items-center">
          <label className="btn btn-ghost btn-circle avatar mx-2 my-auto">
            <img
              className="avatar w-10 rounded-full"
              src={selectedFile}
              onClick={() => filePickerRef.current.click()}
            />
          </label>
          <a
            className="link link-hover text-sky-400"
            onClick={() => filePickerRef.current.click()}
          >
            Change Profile Photo
          </a>
          <input
            hidden
            type="file"
            ref={filePickerRef}
            key={inputKey || ""}
            onChange={addImageToPost}
          />
        </div> */}

        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          Username
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
          <input
            type="text"
            placeholder="Username"
            className="inline input input-bordered w-full"
            defaultValue={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
          />
        </div>

        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          First Name
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
          <input
            type="text"
            placeholder="First Name"
            className="inline input input-bordered w-full"
            defaultValue={editFirstName}
            onChange={(e) => setEditFirstName(e.target.value)}
          />
        </div>

        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          Last Name
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
          <input
            type="text"
            placeholder="Last Name"
            className="inline input input-bordered w-full"
            defaultValue={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
          />
        </div>

        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          Email
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
          <input
            disabled
            type="text"
            placeholder="Email"
            className="inline input input-bordered w-full"
            defaultValue={user.email}
          />
        </div>

        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          Bio
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Bio"
            defaultValue={editBio}
            onChange={(e) => setEditBio(e.target.value)}
          ></textarea>
        </div>

        <div className="col-start-10 md:col-start-4">
          <button type="button" className="btn" onClick={handleSubmit}>
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
              {/* <img
                className=""
                style={{ cursor: "pointer" }}
                src={selectedFile}
                onClick={() => filePickerRef.current.click()}
              /> */}
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
          <button type="button" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  };

  const passwordSetting = () => {
    return (
      <div className="grid grid-cols-12 items-center gap-3">
        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          Old Password
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
          <label className="input-group">
            <input
              type={showPass ? "text" : "password"}
              className="inline input input-bordered w-full"
              onChange={(e) => setOldPassword(e.target.value)}
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

        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          New Password
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
          <label className="input-group">
            <input
              type={showNewPass ? "text" : "password"}
              className="inline input input-bordered w-full"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className="btn btn-active btn-ghost text-white"
              onClick={() => setShowNewPass(!showNewPass)}
            >
              {showNewPass ? (
                <AiFillEyeInvisible className="text-white" />
              ) : (
                <AiFillEye className="text-white" />
              )}
            </button>
          </label>
        </div>

        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          Confirm New Password
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
          <label className="input-group">
            <input
              type={showConfirmedPass ? "text" : "password"}
              className="input input-bordered w-full"
              onChange={(e) => setConfNewPassword(e.target.value)}
            />
            <button
              className="btn btn-active btn-ghost text-white"
              onClick={() => setShowConfirmedPass(!showConfirmedPass)}
            >
              {showConfirmedPass ? (
                <AiFillEyeInvisible className="text-white" />
              ) : (
                <AiFillEye className="text-white" />
              )}
            </button>
          </label>
        </div>

        <div className="col-start-10 md:col-start-4">
          <button type="button" className="btn" onClick={handleSubmit} disabled={!oldPassword || !newPassword || !confNewPassword}>
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

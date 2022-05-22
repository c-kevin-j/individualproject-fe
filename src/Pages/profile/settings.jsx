import React, { Profiler } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { editUser, loginAction } from "../../Redux/Actions/userAction";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../../../helper";

const EditProfilePage = (props) => {
  const [selectedTab, setSelectedTab] = React.useState(1)
  
  const { user } = useSelector((state)=>{
    return{
      user: state.usersReducer.user
    }
  })
  
  const filePickerRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [inputKey, setInputKey] = React.useState(null);
  const [loading, setLoading] = React.useState(null)

  const [editFirstName, setEditFirstName] = React.useState("")
  const [editLastName, setEditLastName] = React.useState("")
  const [editUsername, setEditUsername] = React.useState("")
  const [editEmail, setEditEmail] = React.useState("")
  const [oldPassword, setOldPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confNewPassword, setConfNewPassword] = React.useState("")
  const [editProfilePicture, setEditProfilePicture] = React.useState("")
  const [editBio, setEditBio] = React.useState("")
  const [updatedAt, setUpdatedAt] = React.useState(null)

  const [showPass, setShowPass] = React.useState(false)
  const [showNewPass, setShowNewPass] = React.useState(false)
  const [showConfirmedPass, setShowConfirmedPass] = React.useState(false)
  const [validateForm, setValidateForm] = React.useState(true)

  const selectTab = (tab) => {
    setSelectedTab(tab)
  }

  const dispatch = useDispatch()

  //functions untuk mengubah profile photo
  function addImageToPost(event){
    const reader = new FileReader()
    //cek apakah ada file yang diupload
    if(event.target.files[0]){
      reader.readAsDataURL(event.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setEditProfilePicture(readerEvent.target.result)
    }
  }

  function removeUploadedFile(){
    setSelectedFile(null);
    //key diubah untuk mereset file yang sudah diupload ke dalam input
    //setInputKeymenggunakan date supaya menghasilkan key yang berbeda-beda
    (Date.now)
  }

  //dijalankan setelah variabel user mengalami perubahan
  React.useEffect(()=>{
    setInitialForm()
  },[user])

  const setInitialForm = () => {
    setEditFirstName(user.first_name)
    setEditLastName(user.last_name)
    setEditUsername(user.username)
    setEditEmail(user.email)
    setEditBio(user.bio)
    setEditProfilePicture(user.profile_picture)
  }

  const handleSubmit = async () => {
    try{
      let formEdit = {}
      if (selectedTab ===1){
        formEdit = {
          ...user,
          username: editUsername,
          first_name: editFirstName,
          last_name: editLastName,
          email: editEmail,
          profile_picture: editProfilePicture,
          bio: editBio,
        }
      }
      else if (selectedTab===2){
        if (oldPassword === user.password){
            if(newPassword === confNewPassword){
              setValidateForm(true)
              formEdit = {
                ...formEdit,
                password:newPassword
              }
            } else {
              alert("konfirmasi password baru salah")
              setValidateForm(false)
            }
        } else {
          alert("Password lama tidak sesuai")
          setValidateForm(false)
        }
      }
      
      if(validateForm===true){
        let res = await axios.patch(`${API_URL}/users/${user.id}`, {
          ...formEdit
        })
        if (res) {
          alert("Update berhasil")
          dispatch(editUser({user:formEdit}))
        }
      }
    } catch(error) {
      console.log(error)
    }
  }

  const userSetting = () => {
    return <div className="grid grid-cols-12 items-center gap-2">
        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          Profile Picture
        </span>
        <div className="col-start-2 col-span-12 md:col-span-8 flex items-center">
          <label className="btn btn-ghost btn-circle avatar mx-2 my-auto">
            <img
              className="avatar w-10 rounded-full"
              src={editProfilePicture}
              onClick={()=>filePickerRef.current.click()}
            />
          </label>
          <a className="link link-hover text-sky-400" onClick={()=>filePickerRef.current.click()}>Change Profile Photo</a>
          <input hidden type="file" ref={filePickerRef} key={inputKey || ''} onChange={addImageToPost}/>
        </div>

        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          Username
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
        <input
            type="text"
            placeholder="Username"
            className="inline input input-bordered w-full"
            defaultValue={editUsername}
            onChange={(e)=>setEditUsername(e.target.value)}
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
            onChange={(e)=>setEditFirstName(e.target.value)}
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
            defaultValue={editEmail}
            onChange={(e)=>setEditEmail(e.target.value)}
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
            onChange={(e)=>setEditLastName(e.target.value)}
          />
        </div>
        
        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          Bio
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
        <input
            type="text"
            placeholder="Bio"
            className="inline input input-bordered w-full"
            defaultValue={editBio}
            onChange={(e)=>setEditBio(e.target.value)}
          />
        </div>

        <div className="col-start-10 md:col-start-4">
          <button type="button" className="btn" onClick={handleSubmit}>Submit</button>
        </div>

      </div>  
  }

  const passwordSetting = () => {
    return <div className="grid grid-cols-12 items-center gap-3">
        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          Old Password
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
        <label className="input-group">
          <input
              type={showPass?"text":"password"}
              className="inline input input-bordered w-full"
              onChange={(e)=>setOldPassword(e.target.value)}
            />
          <button className="btn btn-active btn-ghost text-white" onClick={()=>setShowPass(!showPass)}>
              {showPass
              ?
              <AiFillEyeInvisible className="text-white"/>
              :
              <AiFillEye className="text-white" />
              }
            </button>
        </label>
        </div>

        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          New Password
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
          <label className="input-group">
            <input
                type={showNewPass?"text":"password"}
                className="inline input input-bordered w-full"
                onChange={(e)=>setNewPassword(e.target.value)}
              />
            <button className="btn btn-active btn-ghost text-white" onClick={()=>setShowNewPass(!showNewPass)}>
              {showNewPass
              ?
              <AiFillEyeInvisible className="text-white"/>
              :
              <AiFillEye className="text-white" />
              }
            </button>
          </label>
        </div>

        <span className="col-span-12 md:col-start-2 md:col-span-2 font-bold">
          Confirm New Password
        </span>
        <div className="col-start-2 col-span-10 md:col-span-8">
        <label className="input-group">
          <input
              type={showConfirmedPass?"text":"password"}
              className="input input-bordered w-full"
              onChange={(e)=>setConfNewPassword(e.target.value)}
            />
          <button className="btn btn-active btn-ghost text-white" onClick={()=>setShowConfirmedPass(!showConfirmedPass)}>
              {showConfirmedPass
              ?
              <AiFillEyeInvisible className="text-white"/>
              :
              <AiFillEye className="text-white" />
              }
            </button>
        </label>
        </div>

        <div className="col-start-10 md:col-start-4">
          <button type="button" className="btn" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  }

  return <>
      <div className="grid grid-cols-12 pt-4">
        <div className="justify-center col-start-2 col-span-10 md:col-start-3 md:col-span-8 tabs">
          <a className={`tab tab-bordered ${selectedTab===1&&"tab-active"}`} onClick={()=>selectTab(1)}>Edit Profile</a>
          <a className={`tab tab-bordered ${selectedTab===2&&"tab-active"}`} onClick={()=>selectTab(2)}>Change Password</a>
        </div>
        <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 pt-5">
          <div className="form-control">
            {selectedTab===1 ? userSetting() : passwordSetting()}
          </div>
        </div>
      </div>
  </>
  
}

EditProfilePage.layout = "L1";

export default EditProfilePage
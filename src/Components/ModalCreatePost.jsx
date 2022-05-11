import React from "react";
import { Modal, Button } from "react-daisyui";
import {AiFillCamera} from "react-icons/ai"
import Link from "next/link";

function ModalCreatePost(props) {

  const filePickerRef = React.useRef(null);
  const captionRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [inputKey, setInputKey] = React.useState(null);
  const [loading, setLoading] = React.useState(null)
  
  function addImageToPost(event){
    const reader = new FileReader()

    //cek apakah ada file yang diupload
    if(event.target.files[0]){
      reader.readAsDataURL(event.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  function removeUploadedFile(){
    setSelectedFile(null);
    //key diubah untuk mereset file yang sudah diupload ke dalam input
    //menggunakan date supaya menghasilkan key yang berbeda-beda
    setInputKey(Date.now)
  }
  
  async function uploadPost(event) {
    if (loading) return;

    setLoading(true);
  }


  return <>
    <Modal open={props.visible} onClickBackdrop={props.toggleVisible}>
    <div className="">
      
        <div className="flex place-content-center">
          { selectedFile 
          ? <>
            <img onClick={removeUploadedFile} src={selectedFile} alt="Uploaded" className="max-w-[400px] max-h-[400px] object-cover cursor-pointer" />
          </> 
          : <>
          <div className="w-[250px] h-[250px] flex items-center place-content-center">
            <div className="flex cursor-pointer w-10 h-10 bg-blue-200 rounded-full border-2 text-blue-500 ">
              <AiFillCamera onClick={()=>filePickerRef.current.click()} className="m-auto" />
            </div>
          </div>
          </> }
            
        </div>
        <input type="text" maxLength="150" placeholder="Insert your caption..." ref={captionRef} className="my-4 border-none text-center w-full input-lg focus:ring-0"/>
        <input type="file" hidden ref={filePickerRef} key={inputKey || ''} onChange={addImageToPost}/>
        
        <Link href="/home">
          <button disabled={!selectedFile || loading} type="button" onClick={uploadPost} className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 
          disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100">
            Upload Post
          </button>

        </Link>
      </div>
    </Modal>
  </>
}

export default ModalCreatePost
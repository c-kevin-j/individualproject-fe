import React, {useState} from "react";
import {AiFillCamera} from "react-icons/ai"
import Link from "next/link";

function CreatePost (props) {
  const filePickerRef = React.useRef(null);
  const captionRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputKey, setInputKey] = useState(null);
  const [loading, setLoading] = useState(null)
  
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
    <div className="container px-5 mx-auto">
      Upload Image
      <div className="px-6 lg:px-40 grid grid-cols-12">
        <div className="col-span-12 md:col-span-7 flex place-content-center">
          { selectedFile 
          ? <>
            <img onClick={removeUploadedFile} src={selectedFile} alt="Uploaded" className="max-w-[500px] max-h-[500px] object-cover cursor-pointer" />
          </> 
          : <>
          <div className="w-[250px] h-[250px] flex items-center place-content-center">
            <div className="flex cursor-pointer w-10 h-10 bg-blue-200 rounded-full border-2 text-blue-500 ">
              <AiFillCamera onClick={()=>filePickerRef.current.click()} className="m-auto" />
            </div>
          </div>
          </> }
            
        </div>
        <div className="col-span-12 md:col-span-5">
          <div>
            <input type="text" maxLength="150" placeholder="Insert your caption..." ref={captionRef} className="my-4 border-none text-center w-full focus:ring-0"/>
            <input type="file" hidden ref={filePickerRef} key={inputKey || ''} onChange={addImageToPost}/>
          </div>
          <div>
            <Link href="/">
              <button disabled={!selectedFile || loading} type="button" onClick={uploadPost} className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 
              disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100">
                Upload Post
              </button>
            </Link>
          </div>

        </div>
      </div>
      {/* <div className="px-6 lg:px-40 shadow-xl">
        <div className="flex place-content-center">
          { selectedFile 
          ? <>
            <img onClick={removeUploadedFile} src={selectedFile} alt="Uploaded" className="max-w-[500px] max-h-[500px] object-cover cursor-pointer" />
          </> 
          : <>
          <div className="w-[250px] h-[250px] flex items-center place-content-center">
            <div className="flex cursor-pointer w-10 h-10 bg-blue-200 rounded-full border-2 text-blue-500 ">
              <AiFillCamera onClick={()=>filePickerRef.current.click()} className="m-auto" />
            </div>
          </div>
          </> }
            
        </div>
        <input type="text" maxLength="150" placeholder="Insert your caption..." ref={captionRef} className="my-4 border-none text-center w-full focus:ring-0"/>
        <input type="file" hidden ref={filePickerRef} key={inputKey || ''} onChange={addImageToPost}/>
        
        <Link href="/">
          <button disabled={!selectedFile || loading} type="button" onClick={uploadPost} className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 
          disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100">
            Upload Post
          </button>

        </Link>
      </div> */}
    </div>
  </>
}

CreatePost.layout= "L1"

export default CreatePost
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { Modal } from "react-daisyui";
import { API_URL } from "../../../helper";

const ModalEditPost = (props) => {
  const router = useRouter()

  const [caption, setCaption] = React.useState(props.caption)

  const handleSave = async () => {
    try{
      let res = await axios.patch(`${API_URL}/posts/edit`, {
        id:props.postId,
        caption})
      if (res){
        alert(`update berhasil`)
        props.toggleVisible()
        router.push(`/post?id=${props.postId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setCaption(props.caption)
    props.toggleVisible()
  }

  return (
    <Modal
      className="bg-base-300 p-2"
      open={props.visible}
      onClickBackdrop={props.toggleVisible}
    >
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Edit Caption</span>
        </label>
        <input
          type="text"
          placeholder="Insert caption"
          class="input input-bordered w-full max-w-xs"
          defaultValue={caption}
          onChange={(e)=>setCaption(e.target.value)}
        />
      </div>
      <div>
        <button type="button" className="btn btn-sm" onClick={handleSave}>
          Save
        </button>
        <button type="button" className="btn btn-sm" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ModalEditPost;

import { MdOutlineAddPhotoAlternate } from "react-icons/md";

function AddButton(props) {

  return (
    <div>
      <button type="button" className="btn btn-sm btn-accent space-x-2" onClick={props.clickAdd}>
        <MdOutlineAddPhotoAlternate className="text-accent-content"/> Add Post
      </button>
    </div>
  );
}

export default AddButton

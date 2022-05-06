import { MdOutlineAddPhotoAlternate } from "react-icons/md";

function AddButton(props) {

  return (
    <div>
      <button type="button" class="btn btn-sm btn-outline" onClick={props.clickAdd}>
        <MdOutlineAddPhotoAlternate className="text-white"/>
      </button>
    </div>
  );
}

export default AddButton

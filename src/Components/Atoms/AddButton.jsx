import { MdOutlineAddPhotoAlternate } from "react-icons/md";

function AddButton(props) {

  return (
    <div>
      <button type="button" className="btn btn-sm btn-primary" onClick={props.clickAdd}>
        <MdOutlineAddPhotoAlternate className="text-primary-content"/>
      </button>
    </div>
  );
}

export default AddButton

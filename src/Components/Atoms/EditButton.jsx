import { FaEdit } from "react-icons/fa";

function EditButton(props) {

  return (
    <div>
      <button type="button" className="btn btn-sm" startIcon={FaEdit} onClick={props.clickEdit}>
        <FaEdit />Edit
      </button>
    </div>
  );
}

export default EditButton

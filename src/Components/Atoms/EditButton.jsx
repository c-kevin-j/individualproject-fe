import { FaEdit } from "react-icons/fa";

function EditButton(props) {

  return (
    <div>
      <button type="button" class="btn btn-sm" startIcon={FaEdit} onClick={props.clickEdit}>
        <FaEdit />Edit
      </button>
    </div>
  );
}

export default EditButton

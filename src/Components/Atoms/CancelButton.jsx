import { MdCancel } from "react-icons/md";

function EditButton(props) {

  return (
    <div>
      <button type="button" className="btn btn-sm" startIcon={MdCancel} onClick={props.clickCancel}>
        <MdCancel /> Cancel
      </button>
    </div>
  );
}

export default EditButton

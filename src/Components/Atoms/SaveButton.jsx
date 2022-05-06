import { FaSave } from "react-icons/fa";

function SaveButton(props) {

  return (
    <div>
      <button type="button" class="btn btn-sm" onClick={props.clickSave}>
        <FaSave /> Save 
      </button>
    </div>
  );
}

export default SaveButton

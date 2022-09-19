import React from "react";
import { MdDelete , MdEdit} from "react-icons/md";


function Note({title, content, onDelete, id, onEdit }) {
  // color,
  // style={{backgroundColor:color}}
  return (
    <div className="note"  >
      <h1>{title}</h1>
      <p>{content}</p>
      <div>
      <button onClick={() => onDelete(id)}>
        <MdDelete size={25} />
      </button>
      <button onClick={() => {
        onEdit(id);
      }}>
        <MdEdit size={25} />
      </button>
      </div>
    </div>
    
  );
}

export default Note;

import React, { useState } from "react";

import { IoIosAdd } from "react-icons/io";

function CreateArea0({ onAdd }) {
  const [isExpanded, setExpanded0] = useState(false);

  const [note, setNote0] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote0((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  function handleExpanded() {
    setExpanded0(true);
  }

  function submitButton(event) {
    onAdd(note);
    setNote0({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  return (
    <div>
       <form className="box">
        {isExpanded && (
          <input
            value={note.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
        )}
        <p>
          <textarea
            value={note.content}
            onClick={handleExpanded}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
          ></textarea>
        </p>
        <button onClick={submitButton}>
          <IoIosAdd size={35} />
        </button>
      </form>
    </div>
  );
}

export default CreateArea0;

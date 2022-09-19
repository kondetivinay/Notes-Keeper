import React, { useState } from "react";
import "./styles.css";

import Header from "./components/Header";
import CreateArea0 from "./components/CreateArea";
import Note from "./components/Note";

import Footer from "./components/Footer";
import { Modal, ModalBody} from "reactstrap"
import ReactPaginate from "react-paginate";
function App(props) {
  const [notes, setNotes0] = useState(JSON.parse(window.localStorage.getItem("notes") || '[]'));
  const [modal, setModal0] = React.useState(false);
  const [editTitle, SetEditTitle0] = useState("Hi");
  const [editInfo , setEditInfo0 ] = useState("Hi there");
  const [editId, setEditId0] = useState(0);

  // Toggle for Modal
  const toggle = () => setModal0(!modal);

  function addNote(newNote) {
    let newNotes = [...notes, newNote]
    setNotes0(newNotes);
    setUsers0(newNotes.slice(0, 50));
    window.localStorage.setItem("notes", JSON.stringify(newNotes));
  }

  function deleteNotes(id) {
    let updated = [...notes.filter((notes, index) => index !== id)];
    setNotes0(updated);
    setUsers0(updated.slice(0, 50));
    window.localStorage.setItem("notes", JSON.stringify(updated));
  }

  function editNode(id) {
    console.log(id);
    setEditId0(pageNumber*6+id);

    setEditInfo0(notes[pageNumber*6+id].content)
    SetEditTitle0(notes[pageNumber*6+id].title)
    setUsers0(notes.slice(0, 50));
    toggle();
    

  }
  const submitSave = (event) => {
    
    event.preventDefault();
    setModal0(false)
    let tempNotes = notes;
    tempNotes[editId].content = editInfo
    tempNotes[editId].title = editTitle

    setNotes0(tempNotes);
    setUsers0(tempNotes.slice(0, 50));
    window.localStorage.setItem("notes", JSON.stringify(tempNotes));

  }

  React.useEffect( () => {
    setNotes0(JSON.parse(window.localStorage.getItem("notes") || '[]'))

  }, [])
  // const colors = ["#fef68a", "#FE83C6", " #84DFFF", "#b693fd", "#FFC898","#6ECB63"];
  
  console.log(notes);
  const [userNotes, setUsers0] = useState(notes.slice(0, 50));
  const [pageNumber, setPageNumber0] = useState(0);

  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = userNotes
  .slice(pagesVisited, pagesVisited + usersPerPage)
  .map((user,index) => {
    
      // var item=colors[index%6];
      return(

        <Note 
        // color={item}
          key={index}
          id={index}
          title={user.title}
          content={user.content}
          onDelete={deleteNotes}
          onEdit = {editNode}
        />
      
     );
  });
  const pageCount = Math.ceil(userNotes.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber0(selected);

  };

  return (
    <div className="App">
      <Header />
      <div>
        
      </div>
      <CreateArea0 onAdd={addNote}  />
      {displayUsers}
      
      <Footer />
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />

      <Modal isOpen={modal}
        toggle={toggle}>
        <form className="modal-form">
        <ModalBody className="modal-form">
          <input className="test-input-Area"
            value={editTitle}
            type="text"
            placeholder="Title"
            name="title"
            onChange={(e) => {SetEditTitle0(e.target.value)}}
          />

          <textarea className="test-input-Area"
            value={editInfo}
            name="content"
            placeholder="Take a note..."
            onChange={(e) => {setEditInfo0(e.target.value)}}
            rows= {3} 
          ></textarea>
        </ModalBody>
        <button onClick={(event) => {
          submitSave(event)
        }}>
          Save
        </button>
        </form>
      </Modal>
      
    </div>
  );
}

export default App;

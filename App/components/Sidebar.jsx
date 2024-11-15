import React from 'react';

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note._id}>
      <div
        className={`title ${
          note._id === props.currentNote._id ? 'selected-note' : ''
        }`}
        onClick={() => props.setCurrentNoteId(note._id)}
      >
        <h4 className="text-snippet">{note.body.split('\n')[0]}</h4>
        <button
          className="delete-btn"
          onClick={() => props.deleteNote(note._id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}

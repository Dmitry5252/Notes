import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { selectNotes } from "../features/notes/notesSlice";
import style from "../styles/NoteViewer.module.scss";

const prepareDateString = (date: Date) => `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`;

const NoteViewer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const notes = useSelector(selectNotes);
  const note = notes.find((note) => note._id === params.id);
  const date = new Date(note?.date!);
  if (note) {
    return (
      <div className={style.noteViewer}>
        <pre style={note.style as React.CSSProperties} className={style.noteView}>
          <h1>{note.body.title}</h1>
          <div className={style.text}>{note.body.text}</div>
        </pre>
        <div className={style.bottomBar}>
          <button onClick={() => navigate(`/edit/${params.id}`)} className={style.editButton}>
            EDIT
          </button>
          <div className={style.date}>{prepareDateString(date)}</div>
        </div>
      </div>
    );
  } else {
    return <div className={style.noteViewer}>Not Found</div>;
  }
};

export default NoteViewer;

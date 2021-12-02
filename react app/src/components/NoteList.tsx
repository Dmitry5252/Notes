import React from "react";
import { useSelector } from "react-redux";
import { selectNotes } from "../features/notes/notesSlice";
import style from "../styles/NoteList.module.scss";
import NoteCard from "./NoteCard";

const NoteList = ({ favorite, deleted }: { favorite?: boolean; deleted?: boolean }) => {
  const notesValue = useSelector(selectNotes);
  let notes;
  if (favorite) {
    notes = notesValue.filter((note) => note.favorite && !note.deleted);
  } else if (deleted) {
    notes = notesValue.filter((note) => note.deleted);
  } else {
    notes = notesValue.filter((note) => !note.deleted);
  }
  return (
    <div className={style.noteListWrapper}>
      <div className={style.noteList}>
        {notes.map((note) => (
          <NoteCard deleted={deleted} key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NoteList;

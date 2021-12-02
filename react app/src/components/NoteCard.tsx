import React from "react";
import style from "../styles/NoteCard.module.scss";
import { note, permanentlyDeleteNote, toggleDeletedNote, toggleFavoriteNote } from "../features/notes/notesSlice";
import heartImage from "../images/heart.svg";
import greenHeartImage from "../images/greenHeart.svg";
import deletedImage from "../images/deleted.svg";
import restoreImage from "../images/restoreImage.svg";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const prepareDateString = (date: Date) => `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`;

const NoteCard = ({ note, deleted }: { note: note; deleted?: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const date = new Date(note.date!);
  return (
    <div onClick={() => navigate(`/note/${note._id}`)} style={{ ...note.style, fontSize: "1.2rem", textAlign: "left" } as React.CSSProperties} className={style.noteCard}>
      <h2>{note.body.title}</h2>
      <div className={style.text}>{note.body.text}</div>
      <div className={style.bottomBar}>
        <div className={style.date}>{prepareDateString(date)}</div>
        <div className={style.buttons}>
          {deleted ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleDeletedNote(note));
              }}
            >
              <img alt="Restore" src={restoreImage} />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleFavoriteNote(note));
              }}
            >
              {note.favorite ? <img className={note.favorite ? style.likedNoteButton : ""} alt="Add to favorites" src={greenHeartImage} /> : <img alt="Add to favorites" src={heartImage} />}
            </button>
          )}
          {deleted ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(permanentlyDeleteNote(note));
              }}
            >
              <img alt="Delete" src={deletedImage} />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleDeletedNote(note));
              }}
            >
              <img alt="Delete" src={deletedImage} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

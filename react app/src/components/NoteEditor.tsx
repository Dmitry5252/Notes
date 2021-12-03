import React, { useEffect, useState } from "react";
import style from "../styles/NoteEditor.module.scss";
import arrowDownImage from "../images/arrowDown.svg";
import alignLeftImage from "../images/alignLeft.svg";
import alignRightImage from "../images/alignRight.svg";
import alignCenterImage from "../images/alignCenter.svg";
import { RgbaStringColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";
import { createNoteRequest, updateNoteRequest } from "../features/notes/notesApi";
import { addNote, updateNote, selectNotes, note } from "../features/notes/notesSlice";
import { useNavigate, useParams } from "react-router";

const fontList = [
  { name: "Times New Roman", style: `"Times New Roman", Times, serif` },
  { name: "Arial", style: `Arial, sans-serif` },
  { name: " Verdana", style: `Verdana, sans-serif` },
  { name: "Helvetica", style: `Helvetica, sans-serif` },
  { name: "Tahoma", style: `Tahoma, sans-serif` },
  { name: "Trebuchet", style: `'Trebuchet MS', sans-serif` },
  { name: "Georgia", style: `Georgia, serif` },
  { name: " Garamod", style: `Garamond, serif` },
  { name: "Courier New", style: `'Courier New', monospace` },
  { name: "Brush Script MT", style: `'Brush Script MT', cursive` },
];

const fontSizeList = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

const noteTemplate = { body: { title: "", text: "" }, style: { fontFamily: `"Times New Roman", Times, serif`, fontSize: "1.2rem", color: "rgba(255, 255, 255, 1)", backgroundColor: "rgba(38, 39, 48, 1)", textAlign: "left" } as React.CSSProperties };

const NoteEditor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [note, setNote] = useState<note>(noteTemplate);
  const notes = useSelector(selectNotes);
  useEffect(() => {
    if (params.id && notes.length) {
      if (notes.find((note) => note._id === params.id)) {
        setNote(notes.find((note) => note._id === params.id) as note);
      } else {
        navigate("/edit");
      }
    } else {
      setNote(noteTemplate);
    }
    return () => window.removeEventListener("click", hideAllMenus);
  }, [notes, params.id, navigate]);
  const [showFontList, setShowFontList] = useState<boolean>(false);
  const [showFontSizeList, setShowFontSizeList] = useState<boolean>(false);
  const [showFontColorPicker, setShowFontColorPicker] = useState<boolean>(false);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] = useState<boolean>(false);
  const hideAllMenus = () => {
    setShowFontList(false);
    setShowFontSizeList(false);
    setShowFontColorPicker(false);
    setShowBackgroundColorPicker(false);
  };
  window.addEventListener("click", hideAllMenus);
  return (
    <div className={style.noteEditor}>
      <input value={note.body.title} onChange={(e) => setNote({ ...note, body: { ...note.body, title: e.target.value } })} style={{ fontFamily: note.style.fontFamily, color: note.style.color, backgroundColor: note.style.backgroundColor, textAlign: note.style.textAlign }} placeholder="Title" />
      <textarea value={note.body.text} onChange={(e) => setNote({ ...note, body: { ...note.body, text: e.target.value } })} style={note.style} placeholder="Text" />
      <div className={style.noteControls}>
        <button
          onClick={() => {
            if (notes.find((note) => note._id === params.id)) {
              updateNoteRequest(note).then(() => {
                dispatch(updateNote(note));
                navigate(`/note/${note._id}`);
              });
            } else {
              createNoteRequest(note).then(({ data }) => {
                dispatch(addNote(data));
                navigate(`/note/${data._id}`);
              });
            }
          }}
          className={style.saveButton}
        >
          SAVE
        </button>
        <div className={style.noteFormatting}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              hideAllMenus();
              setShowFontList(!showFontList);
            }}
            className={style.fontListButton}
          >
            {fontList.find((font) => font.style === note.style.fontFamily)?.name}
            <img alt="Choose font" src={arrowDownImage} />
            {showFontList && (
              <ul>
                {fontList.map((font) => (
                  <li onClick={() => setNote({ ...note, style: { ...note.style, fontFamily: font.style } })}>{font.name}</li>
                ))}
              </ul>
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              hideAllMenus();
              setShowFontSizeList(!showFontSizeList);
            }}
            className={style.fontSizeButton}
          >
            {note.style.fontSize && +(note.style.fontSize as string).slice(0, (note.style.fontSize as string).indexOf("rem")) * 10}
            <img alt="Choose font size" src={arrowDownImage} />
            {showFontSizeList && (
              <ul>
                {fontSizeList.map((fontSize) => (
                  <li onClick={() => setNote({ ...note, style: { ...note.style, fontSize: `${fontSize / 10}rem` } })}>{fontSize}</li>
                ))}
              </ul>
            )}
          </button>
          <div className={style.colorPickerButtons}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                hideAllMenus();
                setShowFontColorPicker(!showFontColorPicker);
              }}
              style={{ backgroundColor: note.style.color }}
              className={style.colorPickerButton}
            >
              {showFontColorPicker && <RgbaStringColorPicker color={note.style.color} onClick={(e) => e.stopPropagation()} onChange={(newColor) => setNote({ ...note, style: { ...note.style, color: newColor } })} className={style.colorPicker} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                hideAllMenus();
                setShowBackgroundColorPicker(!showBackgroundColorPicker);
              }}
              style={{ backgroundColor: note.style.backgroundColor }}
              className={style.colorPickerButton}
            >
              {showBackgroundColorPicker && <RgbaStringColorPicker color={note.style.backgroundColor} onClick={(e) => e.stopPropagation()} onChange={(newColor) => setNote({ ...note, style: { ...note.style, backgroundColor: newColor } })} className={style.colorPicker} />}
            </button>
          </div>
          <div className={style.alignButtons}>
            <button onClick={() => setNote({ ...note, style: { ...note.style, textAlign: "left" } })}>
              <img alt="Align left" src={alignLeftImage} />
            </button>
            <button onClick={() => setNote({ ...note, style: { ...note.style, textAlign: "center" } })}>
              <img className={style.alignCenterImage} alt="Align center" src={alignCenterImage} />
            </button>
            <button onClick={() => setNote({ ...note, style: { ...note.style, textAlign: "right" } })}>
              <img alt="Align right" src={alignRightImage} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;

import React, { useEffect } from "react";
import SideNav from "../components/SideNav";
import NoteEditor from "../components/NoteEditor";
import style from "../styles/Main.module.scss";
import { Routes, Route, useNavigate } from "react-router";
import NoteViewer from "../components/NoteViewer";
import NoteList from "../components/NoteList";
import { useDispatch } from "react-redux";
import { getNotes } from "../features/notes/notesSlice";

const Main: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, [navigate]);
  const dispatch = useDispatch();
  dispatch(getNotes());
  return (
    <div className={style.main}>
      <SideNav />
      <Routes>
        <Route path="*" element={<NoteList />} />
        <Route path="edit" element={<NoteEditor />} />
        <Route path="edit/:id" element={<NoteEditor />} />
        <Route path="note/:id" element={<NoteViewer />} />
        <Route path="noteList" element={<NoteList />} />
        <Route path="favorite" element={<NoteList favorite />} />
        <Route path="deleted" element={<NoteList deleted />} />
      </Routes>
    </div>
  );
};

export default Main;

import React from "react";
import style from "../styles/SideNav.module.scss";
import drawerImage from "../images/drawer.svg";
import notebookImage from "../images/notebook.svg";
import heartImage from "../images/heart.svg";
import deletedImage from "../images/deleted.svg";
import plusImage from "../images/plus.svg";
import { Link } from "react-router-dom";

const SideNav = () => (
  <nav className={style.sideNav}>
    <div className={style.categories}>
      <Link to="NoteList" className={style.category}>
        <img alt="All Notes" src={drawerImage} />
        All Notes
      </Link>
      <Link className={style.category} to="edit">
        <img alt="Notebook" src={notebookImage} />
        Notebook
      </Link>
      <Link to="Favorite" className={style.category}>
        <img alt="Favorite" src={heartImage} />
        Favorite
      </Link>
      <Link to="Deleted" className={style.category}>
        <img alt="Deleted" src={deletedImage} />
        Deleted
      </Link>
    </div>
    <Link className={style.createNewNoteButton} to="edit">
      <img alt="Notebook" src={plusImage} />
    </Link>
  </nav>
);

export default SideNav;

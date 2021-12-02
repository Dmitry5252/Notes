import express from "express";
const router = express.Router();

import { createNote, updateNote, deleteNote, getNote, getNotes } from "../controllers/notes";

router.post("/note", createNote);

router.put("/note", updateNote);

router.delete("/note", deleteNote);

router.get("/note", getNote);

router.get("/notes", getNotes);

export default router;

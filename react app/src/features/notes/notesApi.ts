import axios from "../../config/axiosInstance";
import { note } from "./notesSlice";

export const createNoteRequest = (note: note) => axios.post("note", note, { headers: { access_token: localStorage.getItem("access_token") as string } });
export const updateNoteRequest = (note: note) => axios.put("note", note, { headers: { access_token: localStorage.getItem("access_token") as string } });
export const deleteNoteRequest = (note: note) => axios.delete("note", { headers: { access_token: localStorage.getItem("access_token") as string, id: note._id as string } });
export const getNotesRequest = () => axios.get("notes", { headers: { access_token: localStorage.getItem("access_token") as string } });

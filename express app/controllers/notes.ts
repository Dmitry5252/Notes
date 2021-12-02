import { ObjectId } from "bson";
import { Request, Response } from "express";
import User from "../model/User";

export const createNote = async (req: Request, res: Response) => {
  const user = await User.getUserByToken(req.headers.access_token as string);
  if (!user) {
    res.sendStatus(401);
  } else {
    const note = await user.createNote(req.body);
    res.send(note);
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const user = await User.getUserByToken(req.headers.access_token as string);
  if (!user) {
    res.sendStatus(401);
  } else {
    const note = { ...req.body, date: new Date(req.body.date), _id: new ObjectId(req.body._id) };
    await user.updateNote(note);
    res.sendStatus(200);
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const user = await User.getUserByToken(req.headers.access_token as string);
  if (!user) {
    res.sendStatus(401);
  } else {
    const note = user.getNote(req.headers.id as string);
    await user.deleteNote(note);
    res.sendStatus(200);
  }
};

export const getNote = async (req: Request, res: Response) => {
  const user = await User.getUserByToken(req.headers.access_token as string);
  if (!user) {
    res.sendStatus(401);
  } else {
    const note = user.getNote(req.headers.id as string);
    if (!note) {
      res.sendStatus(404);
    } else {
      res.send(note);
    }
  }
};

export const getNotes = async (req: Request, res: Response) => {
  const user = await User.getUserByToken(req.headers.access_token as string);
  if (!user) {
    res.sendStatus(401);
  } else {
    res.send(user.getNotes());
  }
};

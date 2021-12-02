import { ObjectId } from "bson";
import MongoDb from "../db";

interface Note {
  date: Date;
  _id: ObjectId;
  favorite: boolean;
  deleted: false;
  body: {
    title: string;
    text: string;
  };
  style: {
    fontFamily: string;
    fontSize: string;
    color: string;
    backgroundColor: string;
    textAlign: string;
  };
}

interface User {
  email: string;
  password: string;
  notes: Note[];
  _id: ObjectId;
}

class User {
  constructor(email: string, password: string, notes: [] = [], _id = new ObjectId()) {
    this.email = email;
    this.password = password;
    this.notes = notes;
    this._id = _id;
  }

  save = () => {
    MongoDb.then((client) => client.db("notes").collection("users").insertOne({ email: this.email, password: this.password, notes: this.notes, _id: this._id }));
  };

  addToken = async () => {
    const token = newToken();
    MongoDb.then((client) => client.db("notes").collection("tokens").insertOne({ user: this._id, token }));
    return token;
  };

  createNote = async (noteValue: Note) => {
    const note = { _id: new ObjectId(), date: new Date(), favorite: false, deleted: false, ...noteValue };
    this.notes.push(note);
    await MongoDb.then((client) =>
      client
        .db("notes")
        .collection("users")
        .findOneAndUpdate({ _id: this._id }, { $set: { notes: this.notes } })
    );
    return note;
  };

  updateNote = async (noteValue: Note) => {
    const index = this.notes.findIndex((e) => e._id.toString() == noteValue._id.toString());
    if (index !== -1) {
      this.notes[index] = noteValue;
      await MongoDb.then((client) =>
        client
          .db("notes")
          .collection("users")
          .findOneAndUpdate({ _id: this._id }, { $set: { notes: this.notes } })
      );
    }
  };

  deleteNote = async (noteValue: Note) => {
    const index = this.notes.findIndex((e) => e._id.toString() == noteValue._id.toString());
    if (index !== -1) {
      this.notes.splice(index, 1);
      await MongoDb.then((client) =>
        client
          .db("notes")
          .collection("users")
          .findOneAndUpdate({ _id: this._id }, { $set: { notes: this.notes } })
      );
    }
  };

  getNote = (id: string) => {
    return this.notes.find((note) => note._id.toString() === id);
  };

  getNotes = () => this.notes;

  static getUserByToken = async (token: string) => {
    const user = await MongoDb.then((client) => client.db("notes").collection("tokens").findOne({ token }));
    if (user) {
      return await this.getUserById(user.user);
    } else {
      return null;
    }
  };

  static getUserById = async (id: string) => {
    const user = await MongoDb.then((client) =>
      client
        .db("notes")
        .collection("users")
        .findOne({ _id: new ObjectId(id) })
    );
    if (user) {
      return new User(user.email, user.password, user.notes, user._id);
    } else {
      return null;
    }
  };

  static getUserByEmail = async (emailValue: string) => {
    const user = await MongoDb.then((client) => client.db("notes").collection("users").findOne({ email: emailValue.toLowerCase() }));
    if (user) {
      return new User(user.email, user.password, user.notes, user._id);
    } else {
      return null;
    }
  };
}

const newToken = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");

export default User;

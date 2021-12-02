import express from "express";
import cors from "cors";

const port = 4000;

const app = express();

app.use(express.json());

app.use(cors());

import authentificationRouter from "./routes/authentification";
import notesRouter from "./routes/notes";

app.use(authentificationRouter);
app.use(notesRouter);

app.listen(port);

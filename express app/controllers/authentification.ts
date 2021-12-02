import { Request, Response } from "express";
import User from "../model/User";
import { required, email, minLength, maxLength, composeValidators } from "../utils/validators";

export const register = async (req: Request, res: Response) => {
  if (composeValidators(required, email)(req.body.email) || composeValidators(required, minLength, maxLength)(req.body.password)) {
    res.sendStatus(401);
  } else if (await User.getUserByEmail(req.body.email)) {
    res.status(401).json("Email already used");
  } else {
    const user = new User(req.body.email, req.body.password);
    user.save();
    res.json({ access_token: await user.addToken() });
  }
};

export const login = async (req: Request, res: Response) => {
  const user = await User.getUserByEmail(req.body.email);
  if (!user) {
    res.sendStatus(401);
  } else {
    if (user.password === req.body.password) {
      res.json({ access_token: await user.addToken() });
    } else {
      res.sendStatus(401);
    }
  }
};

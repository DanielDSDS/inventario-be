import { Request, Response } from "express";
import * as authService from "../services/auth.services";

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await authService.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await authService.comparePasswords(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = authService.generateToken(user);
  res.json({ token, user });
}

export async function getUser(req: Request, res: Response) {
  const email = req.body.email;

  const user = await authService.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}

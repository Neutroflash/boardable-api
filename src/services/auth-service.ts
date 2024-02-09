import bcrypt from "bcrypt";
import * as userDB from "../data/auth-data";
import { ApiError } from "../middleware/error";
import { User, UserParams } from "../models/userModel";
import { costFactor } from "../utils/const-util";

export async function getUserByUsername(username: string): Promise<User | undefined> {
  return await userDB.getUserByUsername(username);
}

export async function createUser(data: UserParams): Promise<User> {
  const { username, password } = data;
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    throw new ApiError("El usuario ya está registrado", 400);
  }
  const hashedPassword = await bcrypt.hash(password, costFactor);
  const newUser = await userDB.createUser(username, hashedPassword);
  return newUser;
}

export async function validateCredentials(credentials: UserParams): Promise<User> {
  const { username, password } = credentials;
  const user = await getUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password || ""))) {
    throw new ApiError("Credenciales incorrectas", 401);
  }

  return user;
}

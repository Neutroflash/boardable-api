import { query } from "../db";
import { User } from "../models/userModel";

export async function getUsers(): Promise<User | undefined> {
  return (await query("SELECT * FROM users", [])).rows[0];
}

export async function getUserByUsername(
  username: string
): Promise<User | undefined> {
  return (await query("SELECT * FROM users WHERE username = $1", [username]))
    .rows[0];
}

export async function getUserById(id: number): Promise<User | undefined> {
  return (await query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
}

export async function postRegister(params: {
  [k: string]: string;
}): Promise<User | undefined> {
  const { username, password, role } = params;
  return (
    await query(
      "INSERT INTO users (username, password, role) VALUES ($1,$2,$3);",
      [username, password, role]
    )
  ).rows[0];
}

export async function createUser(username: string, password: string) {
  return (
    await query(
      ` INSERT INTO users (username, password) VALUES ($1, $2)
        RETURNING  id,username,  email,  firstname,  lastname,
  TO_CHAR(createdAt::TIMESTAMP WITH TIME ZONE AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH24:MI:SSOF') as "createdAt",
  TO_CHAR(updatedAt::TIMESTAMP WITH TIME ZONE AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH24:MI:SSOF') as "updatedAt";
      `,
      [username, password]
    )
  ).rows[0];
}
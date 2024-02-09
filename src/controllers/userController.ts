import { Request, Response, NextFunction } from "express";
import { PrismaClient, Role } from "@prisma/client";
import { userSchema, UserParams } from "../models/userModel";
import { ApiError } from "../middleware/error";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: UserParams = userSchema.parse(req.body);
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        password: userData.password,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role as Role, 
      },
    });
    res.json(user);
  } catch (error) {
    next(new ApiError("No Autorizado", 401))
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.id);
  const userData: UserParams = userSchema.parse(req.body);
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: userData.username,
        password: userData.password,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role as Role,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    next(new ApiError("Error al actualizar usuario", 500));
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.id);
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(new ApiError("Error al eliminar usuario", 500));
  }
};

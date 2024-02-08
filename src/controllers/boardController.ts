import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "../middleware/error";

const prisma = new PrismaClient();

export const createBoard = async (req: Request, res: Response, next: any) => {
  try {
    const { title } = req.body;
    const newBoard = await prisma.board.create({
      data: {
        title,
      },
    });
    res.json(newBoard);
  } catch (error) {
    next(error);
  }
};

export const getAllBoards = async (req: Request, res: Response, next: any) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch (error) {
    next(error);
  }
};

export const getBoardById = async (req: Request, res: Response, next: any) => {
  try {
    const { boardId } = req.params;
    const board = await prisma.board.findUnique({
      where: { id: parseInt(boardId) },
    });
    if (!board) {
      return res.status(404).json({ error: "Tablero no encontrado" });
    }
    res.json(board);
  } catch (error) {
    next(error);
  }
};

export const updateBoardTitle = async (req: Request, res: Response, next: any) => {
  try {
    const { boardId } = req.params;
    const { title } = req.body;
    const updatedBoard = await prisma.board.update({
      where: { id: parseInt(boardId) },
      data: { title },
    });
    res.json(updatedBoard);
  } catch (error) {
    next(error);
  }
};

export const deleteBoard = async (req: Request, res: Response, next: any) => {
  try {
    const { boardId } = req.params;
    await prisma.board.delete({ where: { id: parseInt(boardId) } });
    res.json({ message: "Tablero eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "../middleware/error";

const prisma = new PrismaClient();


export const createList = async (req: Request, res: Response, next: any) => {
  try {
    const { title, boardId } = req.body;
    const newList = await prisma.list.create({
      data: {
        title,
        board: { connect: { id: parseInt(boardId) } },
      },
    });
    res.json(newList);
  } catch (error) {
    next(error);
  }
};

export const getListsByBoardId = async (req: Request, res: Response, next: any) => {
  try {
    const { boardId } = req.params;
    const lists = await prisma.list.findMany({
      where: { boardId: parseInt(boardId) },
    });
    res.json(lists);
  } catch (error) {
    next(error);
  }
};

export const updateListTitle = async (req: Request, res: Response, next: any) => {
  try {
    const { listId } = req.params;
    const { title } = req.body;
    const updatedList = await prisma.list.update({
      where: { id: parseInt(listId) },
      data: { title },
    });
    res.json(updatedList);
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (req: Request, res: Response, next: any) => {
  try {
    const { listId } = req.params;
    await prisma.list.delete({ where: { id: parseInt(listId) } });
    res.json({ message: "Lista eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

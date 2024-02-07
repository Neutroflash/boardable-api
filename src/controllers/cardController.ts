import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "../middleware/error";

const prisma = new PrismaClient();

export const createCard = async (req: Request, res: Response, next: any) => {
  try {
    const { title, listId } = req.body;
    const newCard = await prisma.card.create({
      data: {
        title,
        list: { connect: { id: parseInt(listId) } },
      },
    });
    res.json(newCard);
  } catch (error) {
    next(error);
  }
};

export const getCardsByListId = async (req: Request, res: Response, next: any) => {
  try {
    const { listId } = req.params;
    const cards = await prisma.card.findMany({
      where: { listId: parseInt(listId) },
    });
    res.json(cards);
  } catch (error) {
    next(error);
  }
};

export const updateCardTitle = async (req: Request, res: Response, next: any) => {
  try {
    const { cardId } = req.params;
    const { title } = req.body;
    const updatedCard = await prisma.card.update({
      where: { id: parseInt(cardId) },
      data: { title },
    });
    res.json(updatedCard);
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: any) => {
  try {
    const { cardId } = req.params;
    await prisma.card.delete({ where: { id: parseInt(cardId) } });
    res.json({ message: "Tarjeta eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

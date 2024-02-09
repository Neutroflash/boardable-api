import express from "express";
import { createUser, validateCredentials } from "../services/auth-service";
import { validationHandler } from "../middleware/validation.js";
import { userSchema } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/const-util";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validationHandler(userSchema), // Middleware para validar el cuerpo de la solicitud
  async (req, res, next) => {
    try {
      const userData = await createUser(req.body); // Crear un nuevo usuario en la base de datos
      res.status(201).json({
        ok: true,
        data: userData,
      });
    } catch (error) {
      next(error); // Manejar cualquier error que ocurra durante la creación del usuario
    }
  }
);

authRouter.post("/login", async (req, res, next) => {
  try {
    const user = await validateCredentials(req.body); // Validar las credenciales del usuario
    const payload = { userId: user.id, userRole: user.role };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "10h" }); // Crear un token JWT
    res.status(200).json({
      ok: true,
      data: { token },
    });
  } catch (error) {
    next(error); // Manejar cualquier error que ocurra durante el proceso de inicio de sesión
  }
});

export default authRouter;

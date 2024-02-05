import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "pg"
import cors from "cors"

const app = express ();
app.use(express.json());
app.use(cors());

app.listen(5500, () => {
    console.log('El servidor está corriendo en el puerto 3000');
  });
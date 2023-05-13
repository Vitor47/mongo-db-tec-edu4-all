import { Router } from "express";
import {
  listStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/student.service.js";
import authenticationMiddleware from "../middlewares/auth.middleware.js";

import studentSchema from "../utils/schemaValidation.js";

const studentRoutes = Router();

// Define a rota para listar todos os usuários
studentRoutes.get("/", async (req, res) => {
  const students = await listStudent();
  return res.status(200).json(students);
});

// Define a rota para buscar um usuário por ID
studentRoutes.get("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const student = await listStudent(id);
  return res.status(200).json(student);
});

// Define a rota para criar um novo usuário
studentRoutes.post("/", async (req, res) => {
  const { error } = await studentSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const studentCreated = await createStudent(req.body);

  return res.status(200).json(studentCreated);
});

// Define a rota para atualizar um usuário existente por ID
studentRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await studentSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const studentUpdated = await updateStudent(id, req.body);
  return res.status(200).json(studentUpdated);
});

// Define a rota para excluir um usuário existente por ID
studentRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const studentDeleted = await deleteStudent(id);
  return res.status(200).json(studentDeleted);
});

export default studentRoutes;

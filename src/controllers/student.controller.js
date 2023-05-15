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

studentRoutes.get("/", authenticationMiddleware, async (req, res) => {
  const students = await listStudent();
  return res.status(200).json(students);
});

studentRoutes.get("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const student = await listStudent(id);
  return res.status(200).json(student);
});

studentRoutes.post("/", async (req, res) => {
  const { error } = await studentSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const studentCreated = await createStudent(req.body);

  return res.status(200).json(studentCreated);
});

studentRoutes.put("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const { error } = await studentSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const studentUpdated = await updateStudent(id, req.body);
  return res.status(200).json(studentUpdated);
});

studentRoutes.delete("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;
  const studentDeleted = await deleteStudent(id);
  return res.status(200).json(studentDeleted);
});

studentRoutes.post('/login', async (req, res) => {
  const token = await authentication(req.body);
  res.status(200).json(token);
})

export default studentRoutes;

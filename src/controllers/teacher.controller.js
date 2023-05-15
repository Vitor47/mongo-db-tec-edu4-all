import { Router } from "express";
import {
  listTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../services/teacher.service.js";
import authenticationMiddleware from "../middlewares/auth.middleware.js";

import teacherSchema from "../utils/schemaValidation.js";

const teacherRoutes = Router();

teacherRoutes.get("/", authenticationMiddleware, async (req, res) => {
  const teachers = await listTeacher();
  return res.status(200).json(teachers);
});

teacherRoutes.get("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const teacher = await listTeacher(id);
  return res.status(200).json(teacher);
});

teacherRoutes.post("/", authenticationMiddleware, async (req, res) => {
  const { error } = await teacherSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const teacherCreated = await createTeacher(req.body);

  return res.status(200).json(teacherCreated);
});

teacherRoutes.put("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const { error } = await teacherSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const teacherUpdated = await updateTeacher(id, req.body);
  return res.status(200).json(teacherUpdated);
});

teacherRoutes.delete("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;
  const teacherDeleted = await deleteTeacher(id);
  return res.status(200).json(teacherDeleted);
});

teacherRoutes.post('/login', async (req, res) => {
  const token = await authentication(req.body);
  res.status(200).json(token);
})

export default teacherRoutes;

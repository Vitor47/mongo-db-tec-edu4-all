import { Router } from "express";
import {
  listCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  listInfosCourse,
} from "../services/course.service.js";
import authenticationMiddleware from "../middlewares/auth.middleware.js";

import {courseSchema} from "../utils/schemaValidation.js";

const courseRoutes = Router();

courseRoutes.get("/", authenticationMiddleware, async (req, res) => {
  const courses = await listCourse();
  return res.status(200).json(courses);
});

courseRoutes.get("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const course = await listCourse(id);
  return res.status(200).json(course);
});


courseRoutes.get("infos-curso/", async (req, res) => {
  const { nome } = req.query;

  try {    
    const course = await listInfosCourse(nome);
    if (!course) {
      throw { status: 404, message: "Curso não encontrado" };
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});


courseRoutes.post("/", authenticationMiddleware, async (req, res) => {
  const { error } = await courseSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const courseCreated = await createCourse(req.body, res.locals.payload.isProfessor);

  return res.status(200).json(courseCreated);
});

courseRoutes.put("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const { error } = await courseSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const courseUpdated = await updateCourse(id, req.body, res.locals.payload.isProfessor);
  return res.status(200).json(courseUpdated);
});

courseRoutes.delete("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;
  const courseDeleted = await deleteCourse(id);
  return res.status(200).json(courseDeleted);
});

export default courseRoutes;

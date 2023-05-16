import { Router } from "express";
import studentController from "../controllers/student.controller.js"
import teacherController from "../controllers/teacher.controller.js"
import courseController from "../controllers/course.controller.js"
import matriculaController from "../controllers/matricula.controller.js" 

//habilita o uso de rotas
const routes = Router();

routes.use('/estudantes', studentController);
routes.use('/professores', teacherController);
routes.use('/cursos', courseController);
routes.use('/matriculas', matriculaController);

export default routes;
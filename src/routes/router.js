import { Router } from "express";
import userController from "../controllers/user.controller.js";
import studentController from "../controllers/student.controller.js"

//habilita o uso de rotas
const routes = Router();
//cria uma rota /users, que vai ter as possibilidades dentro do userController
routes.use('/users', userController);
routes.use('/students', studentController);

export default routes;
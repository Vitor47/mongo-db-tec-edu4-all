import { Router } from "express";
import userController from "../controllers/user.controller.js";
import productController from "../controllers/product.controller.js";
import saleController from "../controllers/sale.controller.js";

//habilita o uso de rotas
const routes = Router();
//cria uma rota /users, que vai ter as possibilidades dentro do userController
routes.use('/users', userController);
routes.use('/products', productController);
routes.use('/sales', saleController);

export default routes;
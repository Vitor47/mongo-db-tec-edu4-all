//importo a parte de rotas e os metodos a serem chamados em service
//importo também o middleware que verifica o token
import { Router } from 'express';
import { criarProduto, listarProdutos } from '../services/product.service.js';

const productRoutes = Router();

productRoutes.get('/', async (req, res) => {
    const products = await listarProdutos();
    return res.status(200).json(products);
});

productRoutes.post('/', async (req, res) => {

    const productCreated = await criarProduto(req.body);

    return res.status(200).json(productCreated);
});

export default productRoutes;
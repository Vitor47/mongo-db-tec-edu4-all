import Products from '../models/product.model.js';

const criarProduto = async (dados) => {
  console.log(dados);
  const productCreated = new Products(dados);
  await productCreated.save();
  return productCreated;
};

const listarProdutos = async () => {
  const products = await Products.find();
  return products;
};


export {
  criarProduto,
  listarProdutos
};

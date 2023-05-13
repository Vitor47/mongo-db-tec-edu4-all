//importa o mongoose
import mongoose from 'mongoose';

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema({
  id: Number,
  name: String,
  value: Number,
  description: String,
  image: String,
  quantity: Number
}, { collection: 'products' });

//cria uma model chamada Users com esse schema passado
const Products = mongoose.model('products', schema);

export default Products;

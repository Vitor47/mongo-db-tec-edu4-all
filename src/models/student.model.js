//importa o mongoose
import mongoose from 'mongoose';

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema({
  id: Number,
  name: String,
  image_profile: String,
  email: String,
  cpf: String,
  telephone: String,
  password: String,
  status: Boolean,
}, { collection: 'student' });


const Student = mongoose.model('student', schema);

export default Student;

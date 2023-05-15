//importa o mongoose
import mongoose from 'mongoose';

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema({
  id: Number,
  name: String,
  image_profile: String,
  email: String,
  biografia: String,
  expertise: String,
  git_hub: String,
  linkedin: String,
  password: String,
  status: Boolean,
}, { collection: 'teacher' });


const Teacher = mongoose.model('teacher', schema);

export default Teacher;

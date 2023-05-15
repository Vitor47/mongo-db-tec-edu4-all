//importa o mongoose
import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    descricao: String,
    carga_horaria: Date,
    avaliation: Number,
    value: Decimal128,
    logo: String,
    status: Boolean,
    teacher_responsible: { type: mongoose.Types.ObjectId, ref: "teacher" },
  },
  { collection: "course" }
);


const Course = mongoose.model("course", schema);

export default Course;

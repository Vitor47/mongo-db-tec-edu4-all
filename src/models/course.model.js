//importa o mongoose
import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    descricao: Text,
    carga_horaria: Date,
    avaliation: String,
    value: Decimal128,
    logo: String,
    status: Boolean,
    teacher: { type: mongoose.Types.ObjectId, ref: "teacher" },
  },
  { collection: "course" }
);

//cria uma model chamada teacher com esse schema passado
const Course = mongoose.model("course", schema);

export default Course;

//importa o mongoose
import mongoose from "mongoose";

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema(
  {
    id: Number,
    student: { type: mongoose.Types.ObjectId, ref: "student" },
    course: { type: mongoose.Types.ObjectId, ref: "course" },
    data_matricula: Date,
    status: Boolean,
  },
  { collection: "matricula" }
);

//cria uma model chamada teacher com esse schema passado
const Matricula = mongoose.model("matricula", schema);

export default Matricula;

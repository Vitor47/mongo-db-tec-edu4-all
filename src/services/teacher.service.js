import bcrypt from "bcrypt";
import Teacher from "../models/teacher.model.js";
import { generateJWTToken } from "../utils/jwt.js";

const createTeacher = async (dados, isProfessor) => {
  if (isProfessor) {
    throw { status: 401, message: "Apenas professores podem cadastrar professores." };
  }

  dados.password = bcrypt.hashSync(dados.password, 8);
  const teacher = new Teacher(dados);
  const result = await teacher.save();
  return result;
};

const listTeacher = async (id) => {
  const teacher = await Teacher.findById(id).select("-password");
  return teacher;
};

const updateTeacher = async (id, dados, isProfessor) => {
  if (isProfessor) {
    throw { status: 401, message: "Apenas professores podem editar professores." };
  }

  dados.password = bcrypt.hashSync(dados.password, 8);
  const teacher = await Teacher.findByIdAndUpdate(id, dados, { new: true });
  return teacher;
};

const deleteTeacher = async (id, isProfessor) => {
  if (isProfessor) {
    throw { status: 401, message: "Apenas professores podem remover professores." };
  }

  const teacher = await Teacher.findByIdAndUpdate(id, { situacao: true });
  return teacher;
};

const authentication = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 401, message: "Campos faltantes." };
  }

  const teacher = await Teacher.findOne({ email });

  const comparePassword = bcrypt.compareSync(password, teacher.password);

  if (!teacher || !comparePassword) {
    throw { status: 401, message: "Professor ou senha inválido" };
  }

  const { _id, name } = teacher;

  // Gerar o token
  const token = generateJWTToken({ _id, name, email });
  return { token };
};

export {
  listTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  authentication,
};

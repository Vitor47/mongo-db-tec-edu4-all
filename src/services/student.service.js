import bcrypt from "bcrypt";
import Student from "../models/student.model.js";
import { generateJWTToken } from "../utils/jwt.js";

const createStudent = async (dados) => {
  const { cpf, name, email } = dados;

  const existingStudent = await Student.findOne({ $or: [{ cpf }, { name }, { email }] });

  if (existingStudent) {
    throw { status: 400, message: "Já existe um estudante com esses dados." };
  }

  dados.password = bcrypt.hashSync(dados.password, 8);
  const student = new Student(dados);
  const result = await student.save();
  return result;
};

const listStudent = async (id) => {
  const student = await Student.findById(id).select("-password");
  return student;
};

const updateStudent = async (id, dados) => {
  const { cpf, name, email } = dados;

  const existingStudent = await Student.findOne({
    $and: [
      { _id: { $ne: id } },
      { $or: [{ cpf }, { name }, { email }] }
    ]
  });

  if (existingStudent) {
    throw { status: 400, message: "Já existe um estudante com esses dados." };
  }

  dados.password = bcrypt.hashSync(dados.password, 8);
  const student = await Student.findByIdAndUpdate(id, dados, { new: true });
  return student;
};

const deleteStudent = async (id) => {
  const student = await Student.findByIdAndUpdate(id, { status: true });
  return student;
};

const authentication = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 401, message: "Campos faltantes." };
  }

  const student = await Student.findOne({ email });

  const comparePassword = bcrypt.compareSync(password, student.password);

  if (!student || !comparePassword) {
    throw { status: 401, message: "Estudante ou senha inválido" };
  }

  const { _id, name } = student;

  // Gerar o token
  const token = generateJWTToken({ _id, name, email, isProfessor: false });
  return { token };
};

export {
  listStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  authentication,
};

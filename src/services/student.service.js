import bcrypt from "bcrypt";
import Student from "../models/student.model.js";
import { generateJWTToken } from "../utils/jwt.js";
import 'dotenv/config';

const createStudent = async (dados) => {
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

  console.log(email);
  console.log(password);

  const student = await Student.findOne({ email });

  const comparePassword = bcrypt.compareSync(password, student.password);

  if (!student || !comparePassword) {
    throw { status: 401, message: "Estudante ou senha inválido" };
  }

  const secretKey = process.env.SECRET_KEY;

  console.log(secretKey);
  const { _id, name } = student;

  // Gerar o token
  const token = generateJWTToken({ _id, name, email }, secretKey);

  return { token };
};

export {
  listStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  authentication,
};

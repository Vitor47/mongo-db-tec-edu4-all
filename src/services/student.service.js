import bcrypt from "bcrypt";
import Student from "../models/student.model.js";
import { generateJWTToken } from "../utils/jwt.js";

const createStudent = async (dados) => {
  console.log(dados);

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
  const student = await Student.findByIdAndUpdate(
    id,
    { situacao: true },
    { new: true }
  );
  return student;
};

const authentication = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 401, message: "Campos faltantes." };
  }

  const user = await Users.findOne({ email });

  const comparePassword = bcrypt.compareSync(password, user.password);
  console.log(password, user.password);
  console.log(comparePassword);

  if (!user || !comparePassword) {
    throw { status: 401, message: "Usuário ou senha inválido" };
  }

  const { _id, name } = user;

  // Gerar o token
  const token = generateJWTToken({ _id, name, email });
  return { token };
};

export {
  listStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  authentication,
};

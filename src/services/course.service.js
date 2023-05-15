import Course from "../models/course.model.js";

const createCourse = async (dados, isProfessor) => {
  if (isProfessor) {
    throw { status: 401, message: "Apenas professores podem cadastrar cursos." };
  }

  const course = new Course(dados);
  const result = await course.save();
  return result;
};

const listCourse = async (id) => {
  const course = await Course.findById(id).select("-password");
  return course;
};

const updateCourse = async (id, dados, isProfessor) => {
  if (isProfessor) {
    throw { status: 401, message: "Apenas professores podem editar cursos." };
  }

  const course = await Course.findByIdAndUpdate(id, dados, { new: true });
  return course;
};

const deleteCourse = async (id, isProfessor) => {
  if (isProfessor) {
    throw { status: 401, message: "Apenas professores podem remover cursos." };
  }

  const course = await Course.findByIdAndUpdate(id, { status: true });
  return course;
};

export {
  listCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};

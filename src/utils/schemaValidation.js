const Joi = require('joi').extend(require('@joi/date'));

const userSchema = Joi.object({
    name: Joi.string().required().max(50),
    cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
    email: Joi.string().email().required().max(50),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
});


const studentSchema = Joi.object({
    name: Joi.string().required().max(50),
    image_profile: Joi.link().required().max(50),
    email: Joi.string().email().required().max(50),
    cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
    telephone: Joi.string().regex(/^\d{2}-\d{4,5}-\d{4}$/).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
    status: Joi.boolean().required(),
});


const teacherSchema = Joi.object({
    name: Joi.string().required().max(50),
    image_profile: Joi.link().required().max(50),
    email: Joi.string().email().required().max(50),
    biografia: Joi.string().required().max(50),
    expertise: Joi.string().required().max(50),
    git_hub: Joi.string().required().max(50),
    linkedin: Joi.string().required().max(50),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
    status: Joi.boolean().required(),
});


const courseSchema = Joi.object({
    name: Joi.string().required().max(50),
    descricao: Joi.string().required(),
    carga_horaria: Joi.date().format('DD/MM/YYYY').utc().required(),
    avaliation: Joi.number().required(),
    value: Joi.number().required().precision(2),
    logo: Joi.link().required().max(50),
    status: Joi.boolean().required(),
    teacher_responsible: Joi.number().required(),
});


const matriculaSchema = Joi.object({
    student: Joi.number().required(),
    course: Joi.number().required(),
    data_matricula: Joi.date().format('DD/MM/YYYY').utc().max('now').required(),
    status: Joi.boolean().required(),
});


export {
    userSchema,
    studentSchema,
    teacherSchema,
    courseSchema,
    matriculaSchema,
};
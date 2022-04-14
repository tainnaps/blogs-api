const Joi = require('joi');

const createPostSchema = Joi.object({
  title: Joi
    .string()
    .required()
    .messages({
      'any.required': '"title" is required',
    }),
  content: Joi
    .string()
    .required()
    .messages({
      'any.required': '"content" is required',
    }),
  categoryIds: Joi
    .array()
    .items(Joi.number().integer())
    .required()
    .messages({
      'any.required': '"categoryIds" is required',
    }),
});

/*
  Usei a documentação do Joi como referência para definir a chave categoryIds como proibida.
  link: https://joi.dev/api/?v=17.6.0#anyforbidden
*/
const updatePostSchema = Joi.object({
  title: Joi
    .string()
    .required()
    .messages({
      'any.required': '"title" is required',
    }),
  content: Joi
    .string()
    .required()
    .messages({
      'any.required': '"content" is required',
    }),
  categoryIds: Joi
    .any()
    .forbidden()
    .messages({
      'any.unknown': 'Categories cannot be edited',
    }),
});

module.exports = {
  createPostSchema,
  updatePostSchema,
};

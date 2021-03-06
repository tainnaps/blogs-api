const Joi = require('joi');

/*
  Usei a documentação do Joi como referência para validar email.
  link: https://joi.dev/api/?v=17.6.0#introduction
*/
const userSchema = Joi.object({
  displayName: Joi
    .string()
    .min(8)
    .required()
    .messages({
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
  email: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    .required()
    .messages({
      'string.email': '"email" must be a valid email',
      'any.required': '"email" is required',
    }),
  password: Joi
    .string()
    .length(6)
    .required()
    .messages({
      'string.length': '"password" length must be 6 characters long',
      'any.required': '"password" is required',
    }),
  image: Joi.string(),
});

module.exports = {
  userSchema,
};

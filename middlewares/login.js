const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi
    .string()
    .empty()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    .required()
    .messages({
      'string.email': '"email" must be a valid email',
      'any.required': '"email" is required',
      'string.empty': '"email" is not allowed to be empty',
    }),
  password: Joi
    .string()
    .length(6)
    .empty()
    .required()
    .messages({
      'string.length': '"password" length must be 6 characters long',
      'any.required': '"password" is required',
      'string.empty': '"password" is not allowed to be empty',
    }),
});

const validateLoginData = async (req, _res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema
      .validate({ email, password });

    if (error) throw error;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateLoginData,
};

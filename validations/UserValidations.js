import Joi from 'joi';

const validateRegister = (body) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string().regex(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    ),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  });
  return new Promise((resolve, reject) => {
    Joi.validate(body, schema, (err) => {
      if (err) reject(err);
      else resolve(true); // or a result if there is one?
    });
  });
};

const validateLogin = (body) => {
  const schema = Joi.object().keys({
    email: Joi.string().regex(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    ),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  });
  return new Promise((resolve, reject) => {
    Joi.validate(body, schema, (err) => {
      if (err) reject(err);
      else resolve(true); // or a result if there is one?
    });
  });
};
export { validateRegister, validateLogin };

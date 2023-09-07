import * as Joi from 'joi';

export const bookValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
});

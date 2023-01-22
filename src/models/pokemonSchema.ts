import Joi from "joi";

export const pokemonSchema = Joi.object({
  name: Joi.string().required(),
  weight: Joi.number().required(),
  type: Joi.array().items(Joi.string().required()).required(),
});

export const pokemonSchemaNoType = Joi.object({
  name: Joi.string().required(),
  weight: Joi.number().required(),
});

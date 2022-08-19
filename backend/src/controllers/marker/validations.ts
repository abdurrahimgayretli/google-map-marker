import Joi from 'joi';

const MarkerSchema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});

export default MarkerSchema;

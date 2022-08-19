import * as yup from "yup";

const validations = yup.object().shape({
  lat: yup.number().min(-85).max(85).required(),
  lng: yup.number().min(-180).max(180).required(),
});

export default validations;

import Marker from "../../models/marker";
import Boom from "boom";
import markerSchema from "./validations";

const Create = async (req: any, res: any, next: any) => {
  const input = req.body;
  const { error } = markerSchema.validate(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  try {

    const marker = new Marker(input);
    const savedData = await marker.save();

    res.json(savedData);
  } catch (e) {
    next(e);
  }
};

const Get = async (req: any, res: any, next: any) => {
  const { marker_id } = req.params;

  if (!marker_id) {
    return next(Boom.badRequest("Missing paramter (:marker_id)"));
  }

  try {
    const marker = await Marker.findById(marker_id);

    res.json(marker);
  } catch (e) {
    next(e);
  }
};

const Update = async (req: any, res: any, next: any) => {
  const { marker_id } = req.params;

  try {
    const updated = await Marker.findByIdAndUpdate(marker_id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (e) {
    next(e);
  }
};

const Delete = async (req: any, res: any, next: any) => {
  const { marker_id } = req.params;

  try {
    const deleted = await Marker.findByIdAndDelete(marker_id);

    if (!deleted) {
      throw Boom.badRequest("marker not found.");
    }

    res.json(deleted);
  } catch (e) {
    next(e);
  }
};

const GetList = async (req: any, res: any, next: any) => {
  try {
    const marker = await Marker.find({});
    res.json(marker);
  } catch (e) {
    next(e);
  }
};

export default {
  Create,
  Get,
  Update,
  Delete,
  GetList,
};

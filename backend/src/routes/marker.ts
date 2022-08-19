import express from "express";

import Marker from "../controllers/marker";

const router = express.Router();

router.post("/", Marker.Create);
router.get("/:marker_id", Marker.Get);
router.get("/", Marker.GetList);
router.put("/:marker_id", Marker.Update);
router.delete("/:marker_id", Marker.Delete);

export default router;

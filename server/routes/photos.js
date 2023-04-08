import express from "express";
import {
  addPhoto,
  deletePhoto,
  getPhoto,
  getPhotos,
  updatePhoto,
} from "../controllers/photo.js";

const router = express.Router();

router.get("/", getPhotos);
router.get("/:id", getPhoto);
router.post("/", addPhoto);
router.delete("/:id", deletePhoto);
router.put("/:id", updatePhoto);

export default router;
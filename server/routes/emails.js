import express from "express";
import {
  addEmail,
} from "../controllers/email.js";

const router = express.Router();

router.post("/", addEmail);

export default router;
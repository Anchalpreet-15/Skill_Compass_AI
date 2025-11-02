import express from "express";
import { recommendCareer } from "../controllers/careerController.js";
const router = express.Router();

router.post("/recommend", recommendCareer);

export default router;

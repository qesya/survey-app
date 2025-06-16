import { Router } from "express";
import {
  getAllResponses,
  analyzeSentiment,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/responses", getAllResponses);
router.post("/analyze", analyzeSentiment);

export default router;

import { Router } from "express";
import { fetchSurveyConfig, submitSurveyResponse } from "../controllers/surveyController.js";

const router = Router();

router.get("/", fetchSurveyConfig);
router.post("/responses", submitSurveyResponse);

export default router;

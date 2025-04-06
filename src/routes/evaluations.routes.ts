import { Router } from "express";
import { createEvaluation, listEvaluations } from "../controllers/EvaluationController";

const router = Router();

router.post("/", createEvaluation);
router.get("/", listEvaluations);

export default router;

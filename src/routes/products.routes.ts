import { Router } from "express";
import { createProduct, listProducts } from "../controllers/ProductController";

const router = Router();

router.post("/", createProduct);
router.get("/", listProducts);

export default router;

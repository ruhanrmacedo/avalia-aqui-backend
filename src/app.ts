import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import productRouter from "./routes/products.routes";
import { handleError } from "./middlewares/handleError";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRouter);

app.use(handleError);

export default app;

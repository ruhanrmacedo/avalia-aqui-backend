import { Request, Response } from "express";
import { ProductService } from "../service/ProductService";

const service = new ProductService();

export const createProduct = async (req: Request, res: Response) => {
    const { name, brand, description, price, image } = req.body;

    if (!name || !brand || !description || !price || !image) {
        res.status(400).json({ message: "Todos os campos são obrigatórios." });
        return;
    }

    const service = new ProductService();
    const product = await service.create({ name, brand, description, price, image });

    res.status(201).json(product);
    return;
};

export const listProducts = async (_: Request, res: Response) => {
    const result = await service.listAll();
    res.json(result);
    return;
};

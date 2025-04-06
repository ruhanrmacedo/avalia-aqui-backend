import { Request, Response } from "express";
import { EvaluationService } from "../service/EvaluationService";

const service = new EvaluationService();

export const createEvaluation = async (req: Request, res: Response) => {
    try {
        const evaluation = await service.create(req.body);
        res.status(201).json(evaluation);
        return;
    } catch (err: any) {
        res.status(400).json({ message: err.message });
        return;
    }
};

export const listEvaluations = async (req: Request, res: Response) => {
    const { productId } = req.query;

    if (!productId || isNaN(Number(productId))) {
        res.status(400).json({ message: "Parâmetro 'productId' é obrigatório e deve ser um número." });
        return;
    }

    const result = await service.listByProductId(Number(productId));
    res.json(result);
    return; 
};

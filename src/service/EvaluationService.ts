import { AppDataSource } from "../data-source";
import { Evaluation } from "../entities/Evaluation";
import { Product } from "../entities/Product";

export class EvaluationService {
    private evaluationRepo = AppDataSource.getRepository(Evaluation);
    private productRepo = AppDataSource.getRepository(Product);

    async create(data: any) {
        const product = await this.productRepo.findOneBy({ id: data.productId });
        if (!product) throw new Error("Produto não encontrado.");

        const evaluation = this.evaluationRepo.create({ ...data, product });
        return await this.evaluationRepo.save(evaluation);
    }

    async listByProductId(productId: number) {
        if (!productId || isNaN(productId)) throw new Error("ID do produto inválido.");

        return await this.evaluationRepo.find({
            where: { product: { id: productId } },
        });
    }
}

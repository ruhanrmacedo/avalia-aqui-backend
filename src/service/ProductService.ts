import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";

export class ProductService {
    private repository = AppDataSource.getRepository(Product);

    async create(data: Partial<Product>) {
        const product = this.repository.create(data);
        await this.repository.save(product);
        return product;
    }

    async listAll() {
        return this.repository.find();
    }
}

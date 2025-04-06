import request from "supertest";
import app from "../app";
import { AppDataSource } from "../data-source";

beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
});

afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
});

describe("Testes de avaliação", () => {
    let productId: number;

    beforeAll(async () => {
        const product = await request(app).post("/products").send({
            name: "Produto Teste",
            brand: "Marca X",
            description: "Descrição",
            price: "R$ 19,90",
            image: "https://img.com/teste.jpg"
        });
        productId = product.body.id;
    });

    it("Deve criar uma avaliação com sucesso", async () => {
        const response = await request(app).post("/evaluations").send({
            productId,
            name: "Cliente Teste",
            email: "teste@email.com",
            feedback: "Gostei muito!",
            experience: "Bom",
            recommend: true
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Deve retornar erro ao avaliar produto inexistente", async () => {
        const response = await request(app).post("/evaluations").send({
            productId: 9999,
            name: "Falha",
            email: "fail@email.com",
            feedback: "Erro esperado",
            experience: "Ruim",
            recommend: false
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Produto não encontrado.");
    });

    it("Deve listar avaliações do produto", async () => {
        const response = await request(app).get(`/evaluations?productId=${productId}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

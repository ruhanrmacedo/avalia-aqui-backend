import request from "supertest";
import { AppDataSource } from "../data-source";
import app from "../app"; // crie um arquivo que apenas exporte o app (ver abaixo)

describe("Testes de produto", () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    });

    afterAll(async () => {
        await AppDataSource.dropDatabase();
        await AppDataSource.destroy();
    });

    it("Deve cadastrar um produto com sucesso", async () => {
        const response = await request(app).post("/products").send({
            name: "Produto Teste",
            brand: "Marca Teste",
            description: "Descrição do produto",
            price: "R$ 29,99",
            image: "https://exemplo.com/imagem.jpg"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Produto Teste");
    });

    it("Deve retornar erro ao tentar cadastrar sem nome", async () => {
        const response = await request(app).post("/products").send({
            brand: "Marca Teste",
            description: "Descrição",
            price: "R$ 29,99",
            image: "https://exemplo.com/imagem.jpg"
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Todos os campos são obrigatórios.");
    });
});

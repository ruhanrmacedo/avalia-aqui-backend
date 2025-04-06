import request from "supertest";
import app from "../app";
import { AppDataSource } from "../data-source";

describe("Listagem de produtos", () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();

        // Cadastrar 3 produtos de teste
        const produtosTeste = [
            {
                name: "Produto A",
                brand: "Marca A",
                description: "Descrição A",
                price: "R$ 10,00",
                image: "http://example.com/a.jpg",
            },
            {
                name: "Produto B",
                brand: "Marca B",
                description: "Descrição B",
                price: "R$ 20,00",
                image: "http://example.com/b.jpg",
            },
            {
                name: "Produto C",
                brand: "Marca C",
                description: "Descrição C",
                price: "R$ 30,00",
                image: "http://example.com/c.jpg",
            },
        ];

        for (const produto of produtosTeste) {
            await request(app).post("/products").send(produto);
        }
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it("Deve listar todos os produtos cadastrados", async () => {
        const response = await request(app).get("/products");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(3);
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("price");
    });
});

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1743825013510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "products",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "name", type: "varchar" },
                { name: "brand", type: "varchar" },
                { name: "description", type: "text" },
                { name: "price", type: "varchar" },
                { name: "image", type: "varchar" },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}

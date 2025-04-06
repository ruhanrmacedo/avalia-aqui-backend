import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEvaluations1743953645646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "evaluations",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "product_id",
                        type: "int",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "feedback",
                        type: "text",
                    },
                    {
                        name: "experience",
                        type: "varchar",
                    },
                    {
                        name: "recommend",
                        type: "boolean",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["product_id"],
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("evaluations");
    }

}

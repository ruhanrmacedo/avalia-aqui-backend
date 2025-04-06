import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";

@Entity("evaluations")
export class Evaluation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    feedback: string;

    @Column()
    experience: string;

    @Column()
    recommend: boolean;

    @ManyToOne(() => Product, { onDelete: "CASCADE" })
    @JoinColumn({ name: "product_id" })
    product: Product;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './Tag';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    writer: string;

    @Column()
    cover_image_url: string;

    @Column('decimal', { precision: 5, scale: 2 })
    point: number;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];
}

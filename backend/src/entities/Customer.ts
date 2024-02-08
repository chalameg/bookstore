import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        default: 100 // Set default points to 100
    })
    points: number;

    @Column({ unique: true }) // Ensure username is unique
    username: string;
}

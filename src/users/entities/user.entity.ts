import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 20 })
    first_name: string;

    @Column({ type: 'varchar', length: 20 })
    last_name: string;

    @Column({ type: 'varchar', length: 10 })
    phone_number: string;

    @Column({ type: 'varchar', length: 200 })
    password: string;
}
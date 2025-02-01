import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'varchar', length: 20 })
    first_name: string;

    @Column({ type: 'varchar', length: 20 })
    last_name: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    phone_number?: string;

    @Column({ type: 'varchar', length: 60, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 200 })
    password: string;

    @Column({ type: 'varchar', length: 200, unique: true })
    profile_url: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    bio?: string;

}
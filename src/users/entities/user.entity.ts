import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinTable({
        name: 'users_following_followers_mapping',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'following_user_id',
            referencedColumnName: 'id',
        }
    })
    following_entity: UserEntity[]
}
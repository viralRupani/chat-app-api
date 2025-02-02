import { Field, ObjectType } from '@nestjs/graphql';
import { ChatUserMapping } from 'src/chat/entities/chat-user.entity';
import { ChatsEntity } from 'src/chat/entities/chat.entity';
import { TimestampEntity } from 'src/common/common-entities/time-stamped.entity';
import { MessagesEntity } from 'src/messages/entities/message.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class UsersEntity extends TimestampEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Field()
    @Column({ type: 'varchar', length: 20 })
    first_name: string;

    @Field()
    @Column({ type: 'varchar', length: 20 })
    last_name: string;

    @Field()
    @Column({ type: 'varchar', length: 10, nullable: true })
    phone_number?: string;

    @Field()
    @Column({ type: 'varchar', length: 60, unique: true })
    email: string;

    @Field()
    @Column({ type: 'varchar', length: 20, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 200 })
    password: string;

    @Column({ type: 'varchar', length: 50 })
    salt: string;

    // todo: chagne default url and add validation in dto
    @Column({
        type: 'varchar',
        length: 200,
        unique: true,
        default:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    })
    profile_url: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    bio?: string;

    @Column({ type: 'boolean', default: false })
    is_verified?: boolean;

    /* Relations */
    // user to user mapping for following and follower mapping (user_id -> follows -> following_user_id)
    @ManyToMany(() => UsersEntity, { onDelete: 'CASCADE' })
    @JoinTable({
        name: 'users_following_followers_mapping',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'following_user_id',
            referencedColumnName: 'id',
        },
    })
    following_entity: Relation<UsersEntity[]>;

    // created chats
    @OneToMany(() => ChatsEntity, (chatsEntity) => chatsEntity.user)
    chats: Relation<ChatsEntity[]>;

    // user can generate multiple messages
    @OneToMany(() => MessagesEntity, (messagesEntity) => messagesEntity.user)
    messages: Relation<MessagesEntity[]>;

    @OneToMany(() => ChatUserMapping, (chatUserMapping) => chatUserMapping.user)
    chat_user_mapping: Relation<ChatUserMapping[]>;
}

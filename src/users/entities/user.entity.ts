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
export class UsersEntity extends TimestampEntity {
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
    chat_user_mapping: Relation<ChatUserMapping[]>
}

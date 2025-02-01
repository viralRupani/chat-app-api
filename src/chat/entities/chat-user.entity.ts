import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatsEntity } from './chat.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import { TimestampEntity } from 'src/common/common-entities/time-stamped.entity';

/* Defines which user joined which chat (direct, group) and user's designation */
@Entity()
export class ChatUserMapping extends TimestampEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    // only used for chat with type 'group'
    @Column({ type: 'boolean', default: false })
    is_group_admin: boolean;

    /* Relations */
    @ManyToOne(
        () => ChatsEntity,
        (chatsEntity) => chatsEntity.chat_user_mapping,
    )
    @JoinColumn({ name: 'chat_id' })
    chat: ChatsEntity;

    @ManyToOne(
        () => UsersEntity,
        (usersEntity) => usersEntity.chat_user_mapping,
    )
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;
}

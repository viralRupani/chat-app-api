import { ChatsEntity } from 'src/chat/entities/chat.entity';
import { TimestampEntity } from 'src/common/common-entities/time-stamped.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export class MessagesEntity extends TimestampEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'varchar', length: 1000 })
    text_content: string;

    // to just send the precense of message to client, to show (e.g. the message has been deleted)
    @Column({ type: 'boolean', default: false })
    is_soft_deleted?: boolean;

    /* Relations */
    // parent chat
    @ManyToOne(() => ChatsEntity, (chatEntity) => chatEntity.messages)
    @JoinColumn({ name: 'chat_id' })
    chat: ChatsEntity;

    // created by
    @ManyToOne(() => UsersEntity, (usesrsEntity) => usesrsEntity.messages)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;
}

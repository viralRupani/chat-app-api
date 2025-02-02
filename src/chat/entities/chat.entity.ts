import { TimestampEntity } from 'src/common/common-entities/time-stamped.entity';
import { ChatTypesEnum } from 'src/common/types';
import { MessagesEntity } from 'src/messages/entities/message.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';
import { ChatUserMapping } from './chat-user.entity';

/*
    #group_*: only used for "group" type chat
    #dm_*: only used for "dm" type chat
*/
@Entity({ name: 'chats' })
export class ChatsEntity extends TimestampEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    group_name?: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    group_description: string;

    @Column({
        type: 'enum',
        enum: ChatTypesEnum,
        default: ChatTypesEnum.DIRECT,
    })
    type: ChatTypesEnum;

    @Column({ type: 'varchar', length: 200, unique: true, nullable: true })
    group_profile_url: string;

    /* Relations */
    // child messages
    @OneToMany(() => MessagesEntity, (messagesEntity) => messagesEntity.chat)
    messages: Relation<MessagesEntity[]>;

    // created by
    @ManyToOne(() => UsersEntity, (usersEntity) => usersEntity.chats)
    @JoinColumn({ name: 'user_id' })
    user: Relation<UsersEntity>;

    // describes chat and users mapping with their role and other metadata
    @OneToMany(() => ChatUserMapping, (chatUserMapping) => chatUserMapping.chat)
    chat_user_mapping: Relation<ChatUserMapping>;
}

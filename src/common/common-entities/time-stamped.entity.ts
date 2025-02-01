import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimestampEntity {
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at?: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at?: Date;
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUsers1738503001555 implements MigrationInterface {
    name = 'AlterTableUsers1738503001555';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD "salt" character varying(50) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ADD "is_verified" boolean NOT NULL DEFAULT false`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "profile_url" SET DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "profile_url" DROP DEFAULT`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" DROP COLUMN "is_verified"`,
        );
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "salt"`);
    }
}

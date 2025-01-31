import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1738342844171 implements MigrationInterface {
    name = 'Init1738342844171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(20) NOT NULL, "last_name" character varying(20) NOT NULL, "phone_number" character varying(10) NOT NULL, "password" character varying(200) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

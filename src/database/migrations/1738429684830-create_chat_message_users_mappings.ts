import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChatMessageUsersMappings1738429684830 implements MigrationInterface {
    name = 'CreateChatMessageUsersMappings1738429684830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text_content" character varying(1000) NOT NULL, "is_soft_deleted" boolean NOT NULL DEFAULT false, "chat_id" uuid, "user_id" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."chats_type_enum" AS ENUM('direct', 'group')`);
        await queryRunner.query(`CREATE TABLE "chats" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "group_name" character varying(50), "group_description" character varying(200), "type" "public"."chats_type_enum" NOT NULL DEFAULT 'direct', "group_profile_url" character varying(200), "user_id" uuid, CONSTRAINT "UQ_56f5e6a0d1500120fad2a7cb448" UNIQUE ("group_profile_url"), CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_user_mapping" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_group_admin" boolean NOT NULL DEFAULT false, "chat_id" uuid, "user_id" uuid, CONSTRAINT "PK_de4624be338b86ce153298806de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_7540635fef1922f0b156b9ef74f" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_830a3c1d92614d1495418c46736" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_b6c92d818d42e3e298e84d94414" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_user_mapping" ADD CONSTRAINT "FK_8f3795d1f89512f242b69fce4e2" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_user_mapping" ADD CONSTRAINT "FK_3f02f1481b11b3d887f1fa9543a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_user_mapping" DROP CONSTRAINT "FK_3f02f1481b11b3d887f1fa9543a"`);
        await queryRunner.query(`ALTER TABLE "chat_user_mapping" DROP CONSTRAINT "FK_8f3795d1f89512f242b69fce4e2"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_b6c92d818d42e3e298e84d94414"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_830a3c1d92614d1495418c46736"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_7540635fef1922f0b156b9ef74f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`DROP TABLE "chat_user_mapping"`);
        await queryRunner.query(`DROP TABLE "chats"`);
        await queryRunner.query(`DROP TYPE "public"."chats_type_enum"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}

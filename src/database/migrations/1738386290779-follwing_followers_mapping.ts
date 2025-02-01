import { MigrationInterface, QueryRunner } from "typeorm";

export class FollwingFollowersMapping1738386290779 implements MigrationInterface {
    name = 'FollwingFollowersMapping1738386290779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_following_followers_mapping" ("user_id" uuid NOT NULL, "following_user_id" uuid NOT NULL, CONSTRAINT "PK_99875bea039ea5d73e3cbbce5d7" PRIMARY KEY ("user_id", "following_user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_926364784a73268018ecdca791" ON "users_following_followers_mapping" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a42468d6f9173ad91f26441eb8" ON "users_following_followers_mapping" ("following_user_id") `);
        await queryRunner.query(`ALTER TABLE "users_following_followers_mapping" ADD CONSTRAINT "FK_926364784a73268018ecdca791b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_following_followers_mapping" ADD CONSTRAINT "FK_a42468d6f9173ad91f26441eb8d" FOREIGN KEY ("following_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_following_followers_mapping" DROP CONSTRAINT "FK_a42468d6f9173ad91f26441eb8d"`);
        await queryRunner.query(`ALTER TABLE "users_following_followers_mapping" DROP CONSTRAINT "FK_926364784a73268018ecdca791b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a42468d6f9173ad91f26441eb8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_926364784a73268018ecdca791"`);
        await queryRunner.query(`DROP TABLE "users_following_followers_mapping"`);
    }

}

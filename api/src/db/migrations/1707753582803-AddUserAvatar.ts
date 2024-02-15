import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserAvatar1707753582803 implements MigrationInterface {
    name = 'AddUserAvatar1707753582803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatarUrl" character varying(256)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarUrl"`);
    }

}

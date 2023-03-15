import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPermission1678805376748 implements MigrationInterface {
    name = 'UserPermission1678805376748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "permissions" bigint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "permissions"`);
    }

}

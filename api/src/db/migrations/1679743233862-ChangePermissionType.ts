import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePermissionType1679743233862 implements MigrationInterface {
    name = 'ChangePermissionType1679743233862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "permissions"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "permissions" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "permissions"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "permissions" bigint NOT NULL DEFAULT '0'`);
    }

}

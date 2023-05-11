import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedVerifiedColumn1680126896329 implements MigrationInterface {
    name = 'AddedVerifiedColumn1680126896329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "verified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verified"`);
    }

}

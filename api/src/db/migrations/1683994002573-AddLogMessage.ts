import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLogMessage1683994002573 implements MigrationInterface {
    name = 'AddLogMessage1683994002573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_bd73280924f7e3ffa26082b7122"`);
        await queryRunner.query(`ALTER TABLE "log" RENAME COLUMN "value" TO "message"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "journalId"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "columnTitle"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "columnTitle" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "log" ADD "message" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "log" ADD "journalId" integer`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_bd73280924f7e3ffa26082b7122" FOREIGN KEY ("journalId") REFERENCES "journal"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_bd73280924f7e3ffa26082b7122"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "journalId"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "columnTitle"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "columnTitle" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "log" ADD "message" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "log" ADD "journalId" integer`);
        await queryRunner.query(`ALTER TABLE "log" RENAME COLUMN "message" TO "value"`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_bd73280924f7e3ffa26082b7122" FOREIGN KEY ("journalId") REFERENCES "journal"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

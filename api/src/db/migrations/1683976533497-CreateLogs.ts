import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLogs1683976533497 implements MigrationInterface {
    name = 'CreateLogs1683976533497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "log" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "columnId" character varying NOT NULL, "columnTitle" character varying NOT NULL, "index" integer NOT NULL, "value" character varying NOT NULL, "student_id" integer, "teacher_id" integer, "journalId" integer, CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "columnTitle"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "journalId"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "columnTitle" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "log" ADD "value" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "log" ADD "journalId" integer`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_f79516f7b578dfdb222232787f7" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_0f63242b425fd7d30a701bdd479" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_bd73280924f7e3ffa26082b7122" FOREIGN KEY ("journalId") REFERENCES "journal"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_bd73280924f7e3ffa26082b7122"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_0f63242b425fd7d30a701bdd479"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_f79516f7b578dfdb222232787f7"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "journalId"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "columnTitle"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "journalId" integer`);
        await queryRunner.query(`ALTER TABLE "log" ADD "value" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "log" ADD "columnTitle" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "log"`);
    }

}

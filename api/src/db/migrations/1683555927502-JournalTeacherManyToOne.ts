import { MigrationInterface, QueryRunner } from "typeorm";

export class JournalTeacherManyToOne1683555927502 implements MigrationInterface {
    name = 'JournalTeacherManyToOne1683555927502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journal" DROP CONSTRAINT "FK_2954fd2104a2547a5af57e7cfa7"`);
        await queryRunner.query(`ALTER TABLE "journal" DROP CONSTRAINT "UQ_2954fd2104a2547a5af57e7cfa7"`);
        await queryRunner.query(`ALTER TABLE "journal" ADD CONSTRAINT "FK_2954fd2104a2547a5af57e7cfa7" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journal" DROP CONSTRAINT "FK_2954fd2104a2547a5af57e7cfa7"`);
        await queryRunner.query(`ALTER TABLE "journal" ADD CONSTRAINT "UQ_2954fd2104a2547a5af57e7cfa7" UNIQUE ("teacher_id")`);
        await queryRunner.query(`ALTER TABLE "journal" ADD CONSTRAINT "FK_2954fd2104a2547a5af57e7cfa7" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

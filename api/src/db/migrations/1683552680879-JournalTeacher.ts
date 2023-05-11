import { MigrationInterface, QueryRunner } from "typeorm";

export class JournalTeacher1683552680879 implements MigrationInterface {
    name = 'JournalTeacher1683552680879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journal" DROP CONSTRAINT "FK_6e9139f921c93f4c9e5b018bea4"`);
        await queryRunner.query(`ALTER TABLE "journal" DROP COLUMN "groupsId"`);
        await queryRunner.query(`ALTER TABLE "journal" ADD "group_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "journal" ADD "teacher_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "journal" ADD CONSTRAINT "UQ_2954fd2104a2547a5af57e7cfa7" UNIQUE ("teacher_id")`);
        await queryRunner.query(`ALTER TABLE "journal" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "journal" ADD CONSTRAINT "FK_7cbf31e53c9489c2439b0a19eb2" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journal" ADD CONSTRAINT "FK_2954fd2104a2547a5af57e7cfa7" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journal" DROP CONSTRAINT "FK_2954fd2104a2547a5af57e7cfa7"`);
        await queryRunner.query(`ALTER TABLE "journal" DROP CONSTRAINT "FK_7cbf31e53c9489c2439b0a19eb2"`);
        await queryRunner.query(`ALTER TABLE "journal" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "journal" DROP CONSTRAINT "UQ_2954fd2104a2547a5af57e7cfa7"`);
        await queryRunner.query(`ALTER TABLE "journal" DROP COLUMN "teacher_id"`);
        await queryRunner.query(`ALTER TABLE "journal" DROP COLUMN "group_id"`);
        await queryRunner.query(`ALTER TABLE "journal" ADD "groupsId" integer`);
        await queryRunner.query(`ALTER TABLE "journal" ADD CONSTRAINT "FK_6e9139f921c93f4c9e5b018bea4" FOREIGN KEY ("groupsId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

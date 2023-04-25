import { MigrationInterface, QueryRunner } from "typeorm";

export class GlobalRelations1682371742429 implements MigrationInterface {
    name = 'GlobalRelations1682371742429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teacher_department" ("teacherid" integer NOT NULL, "departmentid" integer NOT NULL, CONSTRAINT "PK_0eb214afed248a52c9a0ee18456" PRIMARY KEY ("teacherid", "departmentid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bdbfd17eec22c40cd9116b4631" ON "teacher_department" ("teacherid") `);
        await queryRunner.query(`CREATE INDEX "IDX_9141788e9151517de040c0c8e7" ON "teacher_department" ("departmentid") `);
        await queryRunner.query(`ALTER TABLE "group" ADD "studentsId" integer`);
        await queryRunner.query(`ALTER TABLE "group" ADD "curatorid" integer`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "userid" integer`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "UQ_d838c19905997bb652392c07bf6" UNIQUE ("userid")`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_89b317f82e257a04c8be5bf0c62" FOREIGN KEY ("studentsId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_dead8ce50f5ef2f76719c7b5ee2" FOREIGN KEY ("curatorid") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_d838c19905997bb652392c07bf6" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_department" ADD CONSTRAINT "FK_bdbfd17eec22c40cd9116b46313" FOREIGN KEY ("teacherid") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teacher_department" ADD CONSTRAINT "FK_9141788e9151517de040c0c8e7c" FOREIGN KEY ("departmentid") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_department" DROP CONSTRAINT "FK_9141788e9151517de040c0c8e7c"`);
        await queryRunner.query(`ALTER TABLE "teacher_department" DROP CONSTRAINT "FK_bdbfd17eec22c40cd9116b46313"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_d838c19905997bb652392c07bf6"`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_dead8ce50f5ef2f76719c7b5ee2"`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_89b317f82e257a04c8be5bf0c62"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "UQ_d838c19905997bb652392c07bf6"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "userid"`);
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "curatorid"`);
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "studentsId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9141788e9151517de040c0c8e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bdbfd17eec22c40cd9116b4631"`);
        await queryRunner.query(`DROP TABLE "teacher_department"`);
    }

}

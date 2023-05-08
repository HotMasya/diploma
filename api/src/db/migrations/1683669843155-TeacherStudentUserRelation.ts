import { MigrationInterface, QueryRunner } from "typeorm";

export class TeacherStudentUserRelation1683669843155 implements MigrationInterface {
    name = 'TeacherStudentUserRelation1683669843155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_a17dcce30e32ae6cef826165b6a"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_d838c19905997bb652392c07bf6"`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_a17dcce30e32ae6cef826165b6a" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_d838c19905997bb652392c07bf6" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_d838c19905997bb652392c07bf6"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_a17dcce30e32ae6cef826165b6a"`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_d838c19905997bb652392c07bf6" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_a17dcce30e32ae6cef826165b6a" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

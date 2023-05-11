import { MigrationInterface, QueryRunner } from "typeorm";

export class StudentGroupFacultyNullable1682339731073 implements MigrationInterface {
    name = 'StudentGroupFacultyNullable1682339731073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_89b317f82e257a04c8be5bf0c62"`);
        await queryRunner.query(`ALTER TABLE "faculty" DROP CONSTRAINT "FK_3c43d6b75e5a880cb4eec42471e"`);
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "studentsId"`);
        await queryRunner.query(`ALTER TABLE "faculty" DROP COLUMN "studentsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "faculty" ADD "studentsId" integer`);
        await queryRunner.query(`ALTER TABLE "group" ADD "studentsId" integer`);
        await queryRunner.query(`ALTER TABLE "faculty" ADD CONSTRAINT "FK_3c43d6b75e5a880cb4eec42471e" FOREIGN KEY ("studentsId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_89b317f82e257a04c8be5bf0c62" FOREIGN KEY ("studentsId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

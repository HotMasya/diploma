import { MigrationInterface, QueryRunner } from "typeorm";

export class TeachersDepartmentsCascade1683122171781 implements MigrationInterface {
    name = 'TeachersDepartmentsCascade1683122171781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_department" DROP CONSTRAINT "FK_9141788e9151517de040c0c8e7c"`);
        await queryRunner.query(`ALTER TABLE "teacher_department" ADD CONSTRAINT "FK_9141788e9151517de040c0c8e7c" FOREIGN KEY ("departmentid") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_department" DROP CONSTRAINT "FK_9141788e9151517de040c0c8e7c"`);
        await queryRunner.query(`ALTER TABLE "teacher_department" ADD CONSTRAINT "FK_9141788e9151517de040c0c8e7c" FOREIGN KEY ("departmentid") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

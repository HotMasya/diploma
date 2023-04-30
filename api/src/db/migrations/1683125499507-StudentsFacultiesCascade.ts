import { MigrationInterface, QueryRunner } from "typeorm";

export class StudentsFacultiesCascade1683125499507 implements MigrationInterface {
    name = 'StudentsFacultiesCascade1683125499507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_911c24b4c15b522140c7d788860"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_8adf7483a1bd9598f5f472b86ea"`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_911c24b4c15b522140c7d788860" FOREIGN KEY ("groupid") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_8adf7483a1bd9598f5f472b86ea" FOREIGN KEY ("facultyid") REFERENCES "faculty"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_8adf7483a1bd9598f5f472b86ea"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_911c24b4c15b522140c7d788860"`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_8adf7483a1bd9598f5f472b86ea" FOREIGN KEY ("facultyid") REFERENCES "faculty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_911c24b4c15b522140c7d788860" FOREIGN KEY ("groupid") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

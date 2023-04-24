import { MigrationInterface, QueryRunner } from "typeorm";

export class DepartmentFacultyShortNameLength1682344391436 implements MigrationInterface {
    name = 'DepartmentFacultyShortNameLength1682344391436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "shortName"`);
        await queryRunner.query(`ALTER TABLE "department" ADD "shortName" character varying(16)`);
        await queryRunner.query(`ALTER TABLE "faculty" DROP COLUMN "shortName"`);
        await queryRunner.query(`ALTER TABLE "faculty" ADD "shortName" character varying(16)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "faculty" DROP COLUMN "shortName"`);
        await queryRunner.query(`ALTER TABLE "faculty" ADD "shortName" character varying(8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "shortName"`);
        await queryRunner.query(`ALTER TABLE "department" ADD "shortName" character varying(8) NOT NULL`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class DepartmentFacultyShortNameNull1682344549203 implements MigrationInterface {
    name = 'DepartmentFacultyShortNameNull1682344549203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "faculty" ALTER COLUMN "shortName" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "faculty" ALTER COLUMN "shortName" DROP NOT NULL`);
    }

}

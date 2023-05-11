import { MigrationInterface, QueryRunner } from "typeorm";

export class DepartmentFacultyShortNameNull21682345551349 implements MigrationInterface {
    name = 'DepartmentFacultyShortNameNull21682345551349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "shortName" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "shortName" DROP NOT NULL`);
    }

}

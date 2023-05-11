import { MigrationInterface, QueryRunner } from "typeorm";

export class DepartmentShortName1682341381740 implements MigrationInterface {
    name = 'DepartmentShortName1682341381740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD "shortName" character varying(8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "shortName"`);
    }

}

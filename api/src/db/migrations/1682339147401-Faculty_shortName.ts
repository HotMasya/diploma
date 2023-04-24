import { MigrationInterface, QueryRunner } from "typeorm";

export class FacultyShortName1682339147401 implements MigrationInterface {
    name = 'FacultyShortName1682339147401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "faculty" ADD "shortName" character varying(8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "faculty" DROP COLUMN "shortName"`);
    }

}

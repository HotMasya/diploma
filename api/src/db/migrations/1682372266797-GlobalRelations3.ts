import { MigrationInterface, QueryRunner } from "typeorm";

export class GlobalRelations31682372266797 implements MigrationInterface {
    name = 'GlobalRelations31682372266797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ADD "facultyid" integer`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_8adf7483a1bd9598f5f472b86ea" FOREIGN KEY ("facultyid") REFERENCES "faculty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_8adf7483a1bd9598f5f472b86ea"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "facultyid"`);
    }

}

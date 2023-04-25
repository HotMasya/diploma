import { MigrationInterface, QueryRunner } from "typeorm";

export class GlobalRelations21682372162788 implements MigrationInterface {
    name = 'GlobalRelations21682372162788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_89b317f82e257a04c8be5bf0c62"`);
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "studentsId"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "groupid" integer`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_911c24b4c15b522140c7d788860" FOREIGN KEY ("groupid") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_911c24b4c15b522140c7d788860"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "groupid"`);
        await queryRunner.query(`ALTER TABLE "group" ADD "studentsId" integer`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_89b317f82e257a04c8be5bf0c62" FOREIGN KEY ("studentsId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

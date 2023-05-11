import { MigrationInterface, QueryRunner } from "typeorm";

export class GlobalRelations41682372873500 implements MigrationInterface {
    name = 'GlobalRelations41682372873500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" RENAME COLUMN "name" TO "userid"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "userid"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "userid" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "UQ_a17dcce30e32ae6cef826165b6a" UNIQUE ("userid")`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_d838c19905997bb652392c07bf6"`);
        await queryRunner.query(`ALTER TABLE "teacher" ALTER COLUMN "userid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_a17dcce30e32ae6cef826165b6a" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_d838c19905997bb652392c07bf6" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_d838c19905997bb652392c07bf6"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_a17dcce30e32ae6cef826165b6a"`);
        await queryRunner.query(`ALTER TABLE "teacher" ALTER COLUMN "userid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_d838c19905997bb652392c07bf6" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "UQ_a17dcce30e32ae6cef826165b6a"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "userid"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "userid" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "name" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" RENAME COLUMN "userid" TO "name"`);
    }

}

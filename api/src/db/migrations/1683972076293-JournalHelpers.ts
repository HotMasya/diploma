import { MigrationInterface, QueryRunner } from "typeorm";

export class JournalHelpers1683972076293 implements MigrationInterface {
    name = 'JournalHelpers1683972076293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "journals_helpers" ("journalId" integer NOT NULL, "teacherId" integer NOT NULL, CONSTRAINT "PK_ee29c7e098f9982212b554aefce" PRIMARY KEY ("journalId", "teacherId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2f03ccbd61beb5c1430cfd2fa7" ON "journals_helpers" ("journalId") `);
        await queryRunner.query(`CREATE INDEX "IDX_52b113704943986463a02dac07" ON "journals_helpers" ("teacherId") `);
        await queryRunner.query(`ALTER TABLE "journals_helpers" ADD CONSTRAINT "FK_2f03ccbd61beb5c1430cfd2fa70" FOREIGN KEY ("journalId") REFERENCES "journal"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "journals_helpers" ADD CONSTRAINT "FK_52b113704943986463a02dac075" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journals_helpers" DROP CONSTRAINT "FK_52b113704943986463a02dac075"`);
        await queryRunner.query(`ALTER TABLE "journals_helpers" DROP CONSTRAINT "FK_2f03ccbd61beb5c1430cfd2fa70"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_52b113704943986463a02dac07"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f03ccbd61beb5c1430cfd2fa7"`);
        await queryRunner.query(`DROP TABLE "journals_helpers"`);
    }

}

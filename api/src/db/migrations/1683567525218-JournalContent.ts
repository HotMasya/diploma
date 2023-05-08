import { MigrationInterface, QueryRunner } from "typeorm";

export class JournalContent1683567525218 implements MigrationInterface {
    name = 'JournalContent1683567525218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journal" RENAME COLUMN "data" TO "rows"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journal" RENAME COLUMN "rows" TO "data"`);
    }

}

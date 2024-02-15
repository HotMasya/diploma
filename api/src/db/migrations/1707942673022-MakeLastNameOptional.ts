import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeLastNameOptional1707942673022 implements MigrationInterface {
    name = 'MakeLastNameOptional1707942673022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastName" SET NOT NULL`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class MakePasswordOptional1707942555324 implements MigrationInterface {
    name = 'MakePasswordOptional1707942555324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}

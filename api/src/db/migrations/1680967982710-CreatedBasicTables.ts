import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedBasicTables1680967982710 implements MigrationInterface {
    name = 'CreatedBasicTables1680967982710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teacher" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faculty" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_635ca3484f9c747b6635a494ad9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "journal" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "description" character varying(512) NOT NULL, "columns" jsonb NOT NULL DEFAULT '[]', "data" jsonb NOT NULL DEFAULT '[]', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "groupsId" integer, CONSTRAINT "PK_396f862c229742e29f888b1abce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "update" ("id" SERIAL NOT NULL, "topic" character varying(256) NOT NULL, "body" character varying(512) NOT NULL, "data" jsonb DEFAULT '{}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_575f77a0576d6293bc1cb752847" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "journal" ADD CONSTRAINT "FK_6e9139f921c93f4c9e5b018bea4" FOREIGN KEY ("groupsId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journal" DROP CONSTRAINT "FK_6e9139f921c93f4c9e5b018bea4"`);
        await queryRunner.query(`DROP TABLE "update"`);
        await queryRunner.query(`DROP TABLE "journal"`);
        await queryRunner.query(`DROP TABLE "faculty"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableDriver1684074365665 implements MigrationInterface {
    name = 'AlterTableDriver1684074365665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ADD "document" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "document"`);
    }

}

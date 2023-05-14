import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1684024061331 implements MigrationInterface {
    name = 'CreateTables1684024061331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car" ("id" character varying NOT NULL, "plate" character varying NOT NULL, "color" character varying NOT NULL, "brand" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driver" ("id" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_use" ("id" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP, "driver_id" character varying NOT NULL, "car_id" character varying NOT NULL DEFAULT now(), "reason_for_use" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b996b554a8aa80c09a210c0e6b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car_use" ADD CONSTRAINT "FK_82ec614e00ba97af054b19595f6" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car_use" ADD CONSTRAINT "FK_f9bfdbac3db07dc3eaa37048b00" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_use" DROP CONSTRAINT "FK_f9bfdbac3db07dc3eaa37048b00"`);
        await queryRunner.query(`ALTER TABLE "car_use" DROP CONSTRAINT "FK_82ec614e00ba97af054b19595f6"`);
        await queryRunner.query(`DROP TABLE "car_use"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP TABLE "car"`);
    }

}

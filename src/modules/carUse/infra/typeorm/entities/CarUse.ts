import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { Driver } from "@modules/driver/infra/typeorm/entities/Driver";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity('car_use')
export class CarUse {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'timestamp'})
    @Column()
    start_date: Date;

    @Column({ type: 'timestamp', nullable: true, default: null})
    end_date: Date;

    @Column()
    driver_id: string;

    @ManyToOne(() => Driver, {eager: true})
    @JoinColumn({ name: "driver_id" })
    driver: Driver;

    @CreateDateColumn()
    car_id: string;

    @ManyToOne(() => Car, {eager: true})
    @JoinColumn({ name: "car_id" })
    car: Car;

    @Column()
    reason_for_use: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

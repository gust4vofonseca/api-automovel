export interface ICarUseDTO {
  id?: string;
  reason_for_use: string;
  driver_id: string
  car_id: string;
  start_date: Date;
  end_date?: Date;
}

import { Expose, Transform } from "class-transformer";

export class ReportDto {
    @Expose()
    id: number;
    @Expose()
    price: number;
    @Expose()
    year: number;
    @Expose()
    lng: number;
    @Expose()
    lat: number;
    @Expose()
    make: string;
    @Expose()
    model: string;
    @Expose()
    mileage: number;
    @Expose()
    approved: boolean;

    // @Transform() -> Take original Report instance and assing user id from it (obj.user.id == report.user.id) to userId
    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number;
}
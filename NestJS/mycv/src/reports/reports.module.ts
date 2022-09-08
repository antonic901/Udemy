import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Report])],
    controllers: [ReportsController],
    providers: [ReportsService],
    exports: [ReportsService] // -> this allows other modules to use this services from reports.modul
})
export class ReportsModule { }
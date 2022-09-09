import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

const cookieSession = require('cookie-session');

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        // This tells TypeORM to use ormconfig.js
        // TypeOrmModule.forRoot(),
        // TypeOrmModule.forRootAsync({
        //     inject: [ConfigService],
        //     useFactory: (config: ConfigService) => {
        //         const settings = require('../ormconfig.js')
        //         return settings;
        //     }
        // }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    type: 'sqlite',
                    database: config.get<string>('DB_NAME'),
                    synchronize: true, // -> 
                    entities: [User, Report]
                }
            }
        }),
        // TypeOrmModule.forRoot({
        //     type: 'sqlite',
        //     database: 'db.sqlite',
        //     entities: [User, Report],
        //     synchronize: true
        // }),
        UsersModule, ReportsModule],
    controllers: [AppController],
    providers: [
        AppService,
        // Said to our app that every request must be proceed through this new ValidationPipe
        // or in the other words
        // Tell Nest.js to use Pipe for validating data inside DTOs
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                // Strip properties from body that are not presented in DTOs
                whitelist: true
            })
        }
    ],
})
export class AppModule {
    constructor(
        private configService: ConfigService
    ) {}
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(cookieSession({
            keys: [this.configService.get('COOKIE_KEY')]
        })).forRoutes('*') // -> * means it is global middleware (applied for every endpoint)
    }
}

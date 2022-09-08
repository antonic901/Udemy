import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Report],
    synchronize: true
  }),
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
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: ['asdada']
    })).forRoutes('*') // -> * means it is global middleware (applied for every endpoint)
  }
}

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

//When we start app, nest takes all modules and creates instance of controllers
@Module({
    controllers: [AppController]
})
export class AppModule {}
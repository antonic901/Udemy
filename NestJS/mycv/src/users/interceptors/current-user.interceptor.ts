import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    
    constructor(private usersService: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler)   {
        console.log('CurrentUserInterceptor is running...')
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};

        if (userId) {
            const user = await this.usersService.findOne(userId);
            request.currentUser = user;
        }
        console.log('...CurrentUserInterceptor is finished.')
        return handler.handle();
    }
    
}
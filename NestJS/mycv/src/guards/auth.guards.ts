import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        console.log('AuthGuard is running...')
        const request = context.switchToHttp().getRequest();
        console.log('...AuthGuard is finished.')
        return request.session.userId;
    }
}
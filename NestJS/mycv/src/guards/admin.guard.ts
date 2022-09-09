import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AdminGuard implements CanActivate {
    // In this case, ExecutionContext is a wrapper around incoming request 
    canActivate(context: ExecutionContext) {
        console.log('AdminGuard is running...')
        const request = context.switchToHttp().getRequest();
        console.log('...AdminGuard is finished.')
        if (!request.currentUser) {
            return false;
        }
        return request.currentUser.admin;
        // if (request.currentUser.admin) {
        //     return true;
        // } else {
        //     return false;
        // }
    }
}
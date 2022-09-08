import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    // context is a wrapper around incoming request
    // never -> means our decorator doesn't need any input arguments
    (data: never, context: ExecutionContext) => {
        console.log('CurrentUser Decorator is running...')
        const request = context.switchToHttp().getRequest();
        console.log('...CurrentUser Decorator is finished.')
        return request.currentUser;
    }
)
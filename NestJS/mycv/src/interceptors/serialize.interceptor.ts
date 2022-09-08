import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToClass } from "class-transformer";

// Accepts only classes
interface ClassConstructor {
    new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run something before a request is handled
        // by the request handler
        // console.log('Im running before the handler', context);

        return handler.handle().pipe(
            map((data: any) => {
                // Run something before the resposne is sent out
                // console.log('Im running before response is sent out', data)
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true // <- this makes sure that @Exclude and @Expose works
                })
            })
        )
    }
}
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users.service";
import { User } from "../user.entity";

// We tell typescript that req may have currenUser
declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        console.log('CurrentUserMiddleware is running...')
        const {userId} = req.session || {};
        if(userId) {
            const user = await this.usersService.findOne(userId);
            req.currentUser = user;
        }
        console.log('...CurrentUserMiddleware is finished.')
        // This tells that this middleware is finished, a that next middleware can be runned
        next();
    }
}
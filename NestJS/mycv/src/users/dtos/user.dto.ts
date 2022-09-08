// expose means sent that prop to the outside world, exclude means do not send that prop to the outside world
import { Expose, Exclude } from "class-transformer";

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;
}
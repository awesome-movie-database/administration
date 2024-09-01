import { UserId } from "src/domain";


export interface CreateUserCommand {
    readonly id: UserId,
    readonly name: string,
    readonly email: string | null,
    readonly telegram: string | null,
    readonly isActive: boolean,
}

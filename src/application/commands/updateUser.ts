import { UserId } from "src/domain";


export interface UpdateUserCommand {
    id: UserId,
    name?: string,
    email?: string,
    telegram?: string,
    isActive?: boolean,
}

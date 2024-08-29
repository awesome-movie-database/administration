import { UserId } from "src/domain";


export class CreateUserCommand {
    constructor(
        public readonly id: UserId,
        public readonly name: string,
        public readonly email: string | null,
        public readonly telegram: string | null,
        public readonly isActive: boolean,
    ) {}
}

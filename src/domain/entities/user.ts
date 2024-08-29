import { UserId } from "src/domain/valueObjects";


export class User {
    constructor(
        public id: UserId,
        public name: string,
        public email: string | null,
        public telegram: string | null,
        public isActive: boolean,
    ) {}
}

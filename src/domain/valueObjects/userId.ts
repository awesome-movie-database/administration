import { validate } from "uuid";


export class UserId {
    constructor(public readonly value: string) {}

    static new(value: string) {
        const isUUID = validate(value);
        if (!isUUID) {
            throw Error(`${value} is not valid UUID`);
        }
        return new UserId(value);
    }
}

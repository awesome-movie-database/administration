import { validate } from "uuid";


export class UserId {
    constructor(public readonly value: string) {
        const isUUID = validate(value);
        if (!isUUID) {
            throw Error(`${value} is not valid UUID`);
        }
        this.value = value
    }
}

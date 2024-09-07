import { UserId } from "src/domain/valueObjects";


export class User {
    public id: UserId
    public name: string
    public email: string | null
    public telegram: string | null
    public isActive: boolean

    constructor(
        userProps: {
            id: UserId,
            name: string,
            email: string | null,
            telegram: string | null,
            isActive: boolean,
        },
    ) {
        this.id = userProps.id
        this.name = userProps.name
        this.email = userProps.email
        this.telegram = userProps.telegram
        this.isActive = userProps.isActive
    }
}

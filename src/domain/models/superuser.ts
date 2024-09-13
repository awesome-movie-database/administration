import { SuperUserRole } from "src/domain/constants";
import { SuperUserId } from "src/domain/valueObjects";


export class SuperUser {
    public id: SuperUserId
    public firstName: string
    public lastName: string
    public avatarUrl: string
    public roles: Array<SuperUserRole>

    constructor(
        superUserProps: {
            id: SuperUserId,
            firstName: string,
            lastName: string,
            avatarUrl: string,
            roles: Array<SuperUserRole>,
        },
    ) {
        this.id = superUserProps.id
        this.firstName = superUserProps.firstName
        this.lastName = superUserProps.lastName
        this.avatarUrl = superUserProps.avatarUrl
        this.roles = superUserProps.roles
    }
}

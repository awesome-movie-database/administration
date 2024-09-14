import { SuperUserRole } from "src/domain/constants";
import { SuperUserId } from "src/domain/valueObjects";
import {
    SuperUserFirstNameValidator,
    SuperUserLastNameValidator,
} from "src/domain/validators";
import { SuperUser } from "src/domain/models";


export class CreateSuperUser {
    protected readonly firstNameValidator: SuperUserFirstNameValidator
    protected readonly lastNameValidator: SuperUserLastNameValidator

    constructor(
        createSuperUserProps: {
            firstNameValidator: SuperUserFirstNameValidator,
            lastNameValidator: SuperUserLastNameValidator,
        },
    ) {
        this.firstNameValidator = createSuperUserProps.firstNameValidator
        this.lastNameValidator = createSuperUserProps.lastNameValidator
    }

    execute(
        createUserParams: {
            id: SuperUserId,
            firstName: string,
            lastName: string,
            avatarUrl: string,
            roles: Array<SuperUserRole>,
        }
    ): SuperUser {
        this.firstNameValidator.validate(createUserParams.firstName)
        this.lastNameValidator.validate(createUserParams.lastName)

        return new SuperUser({
            id: createUserParams.id,
            firstName: createUserParams.firstName,
            lastName: createUserParams.lastName,
            avatarUrl: createUserParams.avatarUrl,
            roles: createUserParams.roles,
        })
    }
}

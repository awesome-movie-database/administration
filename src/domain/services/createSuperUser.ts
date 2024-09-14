import { SuperUserRole } from "src/domain/constants";
import { SuperUserId } from "src/domain/valueObjects";
import {
    EmailValidator,
    SuperUserFirstNameValidator,
    SuperUserLastNameValidator,
} from "src/domain/validators";
import { SuperUser } from "src/domain/models";


export class CreateSuperUser {
    protected readonly firstNameValidator: SuperUserFirstNameValidator
    protected readonly lastNameValidator: SuperUserLastNameValidator
    protected readonly emailValidator: EmailValidator

    constructor(
        createSuperUserProps: {
            firstNameValidator: SuperUserFirstNameValidator,
            lastNameValidator: SuperUserLastNameValidator,
            emailValidator: EmailValidator,
        },
    ) {
        this.firstNameValidator = createSuperUserProps.firstNameValidator
        this.lastNameValidator = createSuperUserProps.lastNameValidator
        this.emailValidator = createSuperUserProps.emailValidator
    }

    execute(
        createUserParams: {
            id: SuperUserId,
            firstName: string,
            lastName: string,
            email: string,
            avatarUrl: string,
            roles: Array<SuperUserRole>,
        }
    ): SuperUser {
        this.firstNameValidator.validate(createUserParams.firstName)
        this.lastNameValidator.validate(createUserParams.lastName)
        this.emailValidator.validate(createUserParams.email)

        return new SuperUser({
            id: createUserParams.id,
            firstName: createUserParams.firstName,
            lastName: createUserParams.lastName,
            email: createUserParams.email,
            isActive: true,
            avatarUrl: createUserParams.avatarUrl,
            roles: createUserParams.roles,
        })
    }
}

import { UserId } from "src/domain/valueObjects";
import {
    EmailValidator,
    UserNameValidator,
    TelegramValidator,
} from "src/domain/validators";
import { User  } from "src/domain/models";


export class CreateUser {
    protected readonly nameValidator: UserNameValidator
    protected readonly emailValidator: EmailValidator
    protected readonly telegramValidator: TelegramValidator

    constructor(
        createUserProps: {
            nameValidator: UserNameValidator,
            emailValidator: EmailValidator,
            telegramValidator: TelegramValidator,
        },
    ) {
        this.nameValidator = createUserProps.nameValidator
        this.emailValidator = createUserProps.emailValidator
        this.telegramValidator = createUserProps.telegramValidator
    }

    execute(
        createUserParams: {
            id: UserId,
            name: string,
            email: string | null,
            telegram: string | null,
            isActive: boolean,
        },
    ): User {
        this.nameValidator.validate(createUserParams.name)

        if (createUserParams.email) {
            this.emailValidator.validate(createUserParams.email)
        }
        if (createUserParams.telegram) {
            this.telegramValidator.validate(createUserParams.telegram)
        }

        return new User({
            id: createUserParams.id,
            name: createUserParams.name,
            email: createUserParams.email,
            telegram: createUserParams.telegram,
            isActive: createUserParams.isActive,
        })
    }
}

import { UserId } from "src/domain/valueObjects";
import {
    UserNameValidator,
    EmailValidator,
    TelegramValidator,
} from "domain/validators";
import { User  } from "src/domain/entities";


export class CreateUser {
    constructor(
        protected readonly nameValidator: UserNameValidator,
        protected readonly emailValidator: EmailValidator,
        protected readonly telegramValidator: TelegramValidator,
    ) {}

    call(
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

        return new User(
            createUserParams.id,
            createUserParams.name,
            createUserParams.email,
            createUserParams.telegram,
            createUserParams.isActive,
        )
    }
}

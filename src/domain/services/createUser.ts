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
        createUserProps: {
            id: UserId,
            name: string,
            email: string | null,
            telegram: string | null,
            isActive: boolean,
        },
    ): User {
        this.nameValidator.validate(createUserProps.name)

        if (createUserProps.email) {
            this.emailValidator.validate(createUserProps.email)
        }
        if (createUserProps.telegram) {
            this.telegramValidator.validate(createUserProps.telegram)
        }

        return new User(
            createUserProps.id,
            createUserProps.name,
            createUserProps.email,
            createUserProps.telegram,
            createUserProps.isActive,
        )
    }
}

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
        id: UserId,
        name: string,
        email: string | null,
        telegram: string | null,
        isActive: boolean,
    ): User {
        this.nameValidator.validate(name)

        if (email) {
            this.emailValidator.validate(email)
        }
        if (telegram) {
            this.telegramValidator.validate(telegram)
        }

        return new User(
            id,
            name,
            email,
            telegram,
            isActive,
        )
    }
}

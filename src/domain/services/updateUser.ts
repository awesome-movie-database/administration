import {
    UserNameValidator,
    EmailValidator,
    TelegramValidator,
} from "src/domain/validators";
import { User } from "src/domain/models";


export class UpdateUser {
    protected readonly nameValidator: UserNameValidator
    protected readonly emailValidator: EmailValidator
    protected readonly telegramValidator: TelegramValidator

    constructor(
        updateUserProps: {
            nameValidator: UserNameValidator,
            emailValidator: EmailValidator,
            telegramValidator: TelegramValidator,
        },
    ) {
        this.nameValidator = updateUserProps.nameValidator
        this.emailValidator = updateUserProps.emailValidator
        this.telegramValidator = updateUserProps.telegramValidator
    }

    execute(
        updateUserParams: {
            user: User,
            name?: string,
            email?: string,
            telegram?: string,
            isActive?: boolean,
        },
    ): void {
        if (updateUserParams.name !== undefined) {
            this.nameValidator.validate(updateUserParams.name)
            updateUserParams.user.name = updateUserParams.name
        }
        if (updateUserParams.email !== undefined) {
            this.emailValidator.validate(updateUserParams.email)
            updateUserParams.user.email = updateUserParams.email
        }
        if (updateUserParams.telegram !== undefined) {
            this.telegramValidator.validate(updateUserParams.telegram)
            updateUserParams.user.telegram = updateUserParams.telegram
        }
        if (updateUserParams.isActive !== undefined) {
            updateUserParams.user.isActive = updateUserParams.isActive
        }
    }
}

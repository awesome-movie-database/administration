import {
    InvalidUserNameError,
    InvalidEmailError,
    InvalidTelegramError
} from "src/domain/errors"


const USER_NAME_MIN_LENGTH = 5
const USER_NAME_MAX_LENGTH = 64

const EMAIL_VALIDATION_PATTERN =
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/

const TELEGRAM_MIN_LENGTH = 5
const TELEGRAM_MAX_LENGTH = 32
const TELEGRAM_VALIDATION_PATTERN = /^[a-zA-Z0-9_]+$/


export class UserNameValidator {
    validate(value: string): void {
        const nameHasSpaces = value.split(" ").length != 1;
        if (
            value.length < USER_NAME_MIN_LENGTH
            || value.length > USER_NAME_MAX_LENGTH
            || nameHasSpaces
        ) {
            throw new InvalidUserNameError()
        }
    }
}


export class EmailValidator {
    validate(value: string): void {
        if (!EMAIL_VALIDATION_PATTERN.test(value)) {
            throw new InvalidEmailError()
        }
    }
}


export class TelegramValidator {
    validate(value: string): void {
        if (
            value.length < TELEGRAM_MIN_LENGTH
            || value.length > TELEGRAM_MAX_LENGTH
            || !TELEGRAM_VALIDATION_PATTERN.test(value)
        ) {
            throw new InvalidTelegramError()
        }

    }
}

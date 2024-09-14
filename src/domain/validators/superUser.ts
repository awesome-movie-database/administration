import {
    InvalidSuperUserFirstNameError,
    InvalidSuperUserLastNameError,
} from "src/domain/errors"


const SUPER_USER_FIRST_NAME_MIN_LENGTH = 64
const SUPER_USER_FIRST_NAME_MAX_LENGTH = 64

const SUPER_USER_LAST_NAME_MIN_LENGTH = 64
const SUPER_USER_LAST_NAME_MAX_LENGTH = 64


export class SuperUserFirstNameValidator {
    validate(value: string): void {
        const fisrtNameHasSpaces = value.split(" ").length != 1;
        if (
            value.length < SUPER_USER_FIRST_NAME_MIN_LENGTH
            || value.length > SUPER_USER_FIRST_NAME_MAX_LENGTH
            || fisrtNameHasSpaces
        ) {
            throw new InvalidSuperUserFirstNameError()
        }
    }
}


export class SuperUserLastNameValidator {
    validate(value: string): void {
        const fisrtNameHasSpaces = value.split(" ").length != 1;
        if (
            value.length < SUPER_USER_LAST_NAME_MIN_LENGTH
            || value.length > SUPER_USER_LAST_NAME_MAX_LENGTH
            || fisrtNameHasSpaces
        ) {
            throw new InvalidSuperUserLastNameError()
        }
    }
}

import { InvalidEmailError } from "src/domain/errors"


const EMAIL_VALIDATION_PATTERN =
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/


export class EmailValidator {
    validate(value: string): void {
        if (!EMAIL_VALIDATION_PATTERN.test(value)) {
            throw new InvalidEmailError()
        }
    }
}

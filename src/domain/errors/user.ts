import { DomainError } from "./base";


export class InvalidUserNameError extends DomainError {}

export class InvalidEmailError extends DomainError {}

export class InvalidTelegramError extends DomainError {}

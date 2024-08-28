import { ApplicationError } from "./base";


export class UserIdIsAlreadyTakenError extends ApplicationError {}

export class UserNameIsAlreadyTakenError extends ApplicationError {}

export class UserEmailIsAlreadyTakenError extends ApplicationError {}

export class UserTelegramIsAlreadyTakenError extends ApplicationError {}

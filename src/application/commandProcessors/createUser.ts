import { Logger } from "pino";

import {
    InvalidUserNameError,
    InvalidEmailError,
    InvalidTelegramError,
    CreateUser,
} from "src/domain";
import {
    CommandProcessor,
    TransactionProcessor,
    UserIdIsAlreadyTakenError,
    UserNameIsAlreadyTakenError,
    UserEmailIsAlreadyTakenError,
    UserTelegramIsAlreadyTakenError,
    UserGateway,
    TransactionManager,
} from "src/application/common";
import { CreateUserCommand } from "src/application/commands";


export function createUserFactory(
    createUserFactoryParams: {
        createUser: CreateUser,
        userGateway: UserGateway,
        txManager: TransactionManager,
        logger: Logger,
    },
): CommandProcessor<CreateUserCommand, void> {
    const createUserProcessor = new CreateUserProcessor({
        createUser: createUserFactoryParams.createUser,
        userGateway: createUserFactoryParams.userGateway,
    })
    const txProcessor = new TransactionProcessor({
        processor: createUserProcessor,
        txManager: createUserFactoryParams.txManager,
    })
    const logProcessor = new CreateUserLoggingProcessor({
        processor: txProcessor,
        logger: createUserFactoryParams.logger,
    })

    return logProcessor
}


class CreateUserProcessor {
    protected readonly createUser: CreateUser
    protected readonly userGateway: UserGateway

    constructor(
        createUserProcessorProps: {
            createUser: CreateUser,
            userGateway: UserGateway,
        },
    ) {
        this.createUser = createUserProcessorProps.createUser
        this.userGateway = createUserProcessorProps.userGateway
    }

    async process(command: CreateUserCommand): Promise<void> {
        const userWithSameId = await this.userGateway.byId(command.id)
        if (userWithSameId) {
            throw new UserIdIsAlreadyTakenError()
        }

        const userWithSameName = await this.userGateway.byName(command.name)
        if (userWithSameName) {
            throw new UserNameIsAlreadyTakenError()
        }

        if (command.email) {
            const userWithSameEmail = await this.userGateway.byEmail(
                command.email,
            )
            if (userWithSameEmail) {
                throw new UserEmailIsAlreadyTakenError()
            }
        }
        if (command.telegram) {
            const userWithSameTelegram = await this.userGateway.byTelegram(
                command.telegram,
            )
            if (userWithSameTelegram) {
                throw new UserTelegramIsAlreadyTakenError()
            }
        }

        const newUser = this.createUser.execute({
            id: command.id,
            name: command.name,
            email: command.email,
            telegram: command.telegram,
            isActive: command.isActive,
        })
        await this.userGateway.save(newUser);
    }
}


class CreateUserLoggingProcessor {
    protected readonly processor: TransactionProcessor
    protected readonly logger: Logger

    constructor(
        createUserLoggingProcessorProps: {
            processor: TransactionProcessor,
            logger: Logger,
        },
    ) {
        this.processor = createUserLoggingProcessorProps.processor
        this.logger = createUserLoggingProcessorProps.logger
    }

    async process(command: CreateUserCommand): Promise<void> {
        this.logger.debug(
            {command: command},
            "'Create user' command processing started",
        )

        try {
            const result = await this.processor.process(command)
        } catch (error) {
            this.processError(error as Error)
        }

        this.logger.debug("'Create User' command processing completed")
    }

    protected processError(error: Error): void {
        if (error instanceof UserIdIsAlreadyTakenError) {
            this.logger.error(
                "Unexpected error occurred: User id is already taken",
            )
        } else if (error instanceof UserNameIsAlreadyTakenError) {
            this.logger.error(
                "Unexpected error occurred: User name is already taken",
            )
        } else if (error instanceof UserEmailIsAlreadyTakenError) {
            this.logger.error(
                "Unexpected error occurred: User email is already taken",
            )
        } else if (error instanceof UserTelegramIsAlreadyTakenError) {
            this.logger.error(
                "Unexpected error occurred: User telegram is already taken",
            )
        } else if (error instanceof InvalidUserNameError) {
            this.logger.error("Unexpected error occurred: Invalid user name")
        } else if (error instanceof InvalidEmailError) {
            this.logger.error("Unexpected error occurred: Invalid user email")
        } else if (error instanceof InvalidTelegramError) {
            this.logger.error(
                "Unexpected error occurred: Invalid user telegram"
            )
        } else {
            this.logger.error(
                {"traceback": error.stack},
                "Unexpected error occurred",
            )
        }
        throw error
    }
}

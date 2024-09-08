import {
    InvalidUserNameError,
    InvalidEmailError,
    InvalidTelegramError,
    UpdateUser,
} from "src/domain";
import {
    CommandProcessor,
    TransactionProcessor,
    UserDoesNotExistError,
    UserNameIsAlreadyTakenError,
    UserEmailIsAlreadyTakenError,
    UserTelegramIsAlreadyTakenError,
    UserGateway,
    TransactionManager,
    Logger,
} from "src/application/common";
import { UpdateUserCommand } from "src/application/commands";


export function updateUserFactory(
    updateUserFactoryParams: {
        updateUser: UpdateUser,
        userGateway: UserGateway,
        txManager: TransactionManager,
        logger: Logger,
    },
): CommandProcessor<UpdateUserCommand, void> {
    const updateUserProcessor = new UpdateUserProcessor({
        updateUser: updateUserFactoryParams.updateUser,
        userGateway: updateUserFactoryParams.userGateway,
    })
    const txProcessor = new TransactionProcessor({
        processor: updateUserProcessor,
        txManager: updateUserFactoryParams.txManager,
    })
    const logProcessor = new UpdateUserLoggingProcessor({
        processor: txProcessor,
        logger: updateUserFactoryParams.logger,
    })

    return logProcessor
}


class UpdateUserProcessor {
    protected readonly updateUser: UpdateUser
    protected readonly userGateway: UserGateway

    constructor(
        updateUserProcessorProps: {
            updateUser: UpdateUser,
            userGateway: UserGateway,
        },
    ) {
        this.updateUser = updateUserProcessorProps.updateUser
        this.userGateway = updateUserProcessorProps.userGateway
    }

    async process(command: UpdateUserCommand): Promise<void> {
        const user = await this.userGateway.byId(command.id, false)
        if (!user) {
            throw new UserDoesNotExistError()
        }

        if (command.name !== undefined) {
            const userWithSameName = await this.userGateway.byName(
                command.name,
            )
            if (userWithSameName) {
                throw new UserNameIsAlreadyTakenError()
            }
        }
        if (command.email !== undefined) {
            const userWithSameEmail = await this.userGateway.byEmail(
                command.email,
            )
            if (userWithSameEmail) {
                throw new UserEmailIsAlreadyTakenError()
            }
        }
        if (command.telegram !== undefined) {
            const userWithSameTelegram = await this.userGateway.byTelegram(
                command.telegram,
            )
            if (userWithSameTelegram) {
                throw new UserTelegramIsAlreadyTakenError()
            }
        }

        this.updateUser.execute({
            user: user,
            name: command.name,
            email: command.email,
            telegram: command.telegram,
            isActive: command.isActive,
        })
        this.userGateway.update(user)
    }
}


class UpdateUserLoggingProcessor {
    protected readonly processor: TransactionProcessor
    protected readonly logger: Logger

    constructor(
        updateUserLoggingProcessorProps: {
            processor: TransactionProcessor,
            logger: Logger,
        },
    ) {
        this.processor = updateUserLoggingProcessorProps.processor
        this.logger = updateUserLoggingProcessorProps.logger
    }

    async process(command: UpdateUserCommand): Promise<void> {
        this.logger.debug(
            "'Update user' command processing started",
            {command: command},
        )

        try {
            await this.processor.process(command)
        } catch (error) {
            this.processError(error as Error)
        }

        this.logger.debug("'Update User' command processing completed")
    }

    protected processError(error: Error): void {
        if (error instanceof UserDoesNotExistError) {
            this.logger.error(
                "Unexpected error occurred: User doesn't exist",
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
                "Unexpected error occurred",
                {"traceback": error.stack},
            )
        }
        throw error
    }
}

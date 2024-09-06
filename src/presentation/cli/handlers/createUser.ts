import { Command, OptionValues } from "commander";
import { v7 as uuid7 } from "uuid";

import {
    UserId,
    UserNameValidator,
    EmailValidator,
    TelegramValidator,
    CreateUser,
} from "src/domain";
import {
    OperationId,
    createUserFactory,
} from "src/application";
import {
    UserMapper,
    postgresConfigFromEnv,
    kyselyDatabaseFactory,
} from "src/infrastructure/database";
import {
    pinoRootLoggerFactory,
    pinoLoggerFactory,
    RealLogger,
} from "src/infrastructure/logging";


export const createUserCommand = new Command("create-user")
    .description("Creates a new user. Does not notify other services.")
    .requiredOption("--id <id>", "Id in UUID format.")
    .requiredOption("--name <name>")
    .option("--email <email>")
    .option("--telegram <telegram>")
    .requiredOption("--active", undefined, false)
    .action(createUser)


async function createUser(options: OptionValues): Promise<void> {
    const postgresConfig = postgresConfigFromEnv()
    const kyselyDatabase = kyselyDatabaseFactory(postgresConfig)
    const kyselyTxBuilder = kyselyDatabase.transaction()

    const userMapper = new UserMapper(kyselyTxBuilder)
    const createUser = new CreateUser({
        nameValidator: new UserNameValidator(),
        emailValidator: new EmailValidator(),
        telegramValidator: new TelegramValidator(),
    })

    const pinoRootLogger = pinoRootLoggerFactory()
    const pinoLogger = pinoLoggerFactory(
        pinoRootLogger,
        new OperationId(uuid7()),
    )
    const realLogger = new RealLogger(pinoLogger)

    const commandProcessor = createUserFactory({
        createUser: createUser,
        userGateway: userMapper,
        txManager: {commit: async () => {}},
        logger: realLogger,
    })
    await commandProcessor.process({
        id: new UserId(options.id),
        name: options.name,
        email: options.email,
        telegram: options.telegram,
        isActive: options.active,
    })
}

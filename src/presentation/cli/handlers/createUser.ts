import { Command, OptionValues } from "commander";
import { pino } from "pino";

import {
    UserId,
    UserNameValidator,
    EmailValidator,
    TelegramValidator,
    CreateUser,
} from "src/domain";
import { createUserFactory } from "src/application";
import {
    UserMapper,
    postgresConfigFromEnv,
    kyselyDatabaseFactory,
} from "src/infrastructure/database";


export const createUserCommand = new Command("create-user")
    .description(
        `Creates a new user. Does not notify other
        services before executing.`
    )
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

    const commandProcessor = createUserFactory({
        createUser: createUser,
        userGateway: userMapper,
        txManager: {commit: async () => {}},
        logger: pino(),
    })
    await commandProcessor.process({
        id: new UserId(options.id),
        name: options.name,
        email: options.email,
        telegram: options.telegram,
        isActive: options.isActive,
    })
}

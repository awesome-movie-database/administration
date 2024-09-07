import * as path from "path";
import { fileURLToPath } from "url";
import { promises as fileSystem } from "fs";

import pg from "pg";
import {
    Kysely,
    TransactionBuilder,
    Transaction,
    PostgresDialect,
    CamelCasePlugin,
    Migrator,
    FileMigrationProvider,
} from "kysely";

import { PostgresConfig } from "./config";
import { UsersTable } from "./tables";


export interface Database { users: UsersTable }


export function kyselyDatabaseFactory(
    postgresConfig: PostgresConfig,
): Kysely<Database> {
    const pool = new pg.Pool({
        user: postgresConfig.username,
        password: postgresConfig.password,
        host: postgresConfig.host,
        port: postgresConfig.port,
        database: postgresConfig.database,
    })
    const postgresDialect = new PostgresDialect({ pool })
    const plugins = [new CamelCasePlugin()]

    return new Kysely<Database>({
        dialect: postgresDialect,
        plugins: plugins,
    })
}


export function kyselyTxBuilderFactory(
    kyselyDatabase: Kysely<Database>,
): TransactionBuilder<Database> {
    return kyselyDatabase.transaction()
}


export function kyselyMigratorFactory(
    database: Kysely<any>,
): Migrator {
    const currentFileName = fileURLToPath(import.meta.url)
    const currentDirectoryName = path.dirname(currentFileName)

    const migrationProvider = new FileMigrationProvider({
        fs: fileSystem,
        path: path,
        migrationFolder: path.resolve(
            currentDirectoryName,
            "migrations",
        ),
    })

    return new Migrator({
        db: database,
        provider: migrationProvider,
    })
}

import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

import { PostgresConfig } from './config';
import { UsersTable } from "./tables"


export interface Database { users: UsersTable }


export function kyselyDatabaseFactory(
    postgresConfig: PostgresConfig,
): Kysely<Database> {
    const pool = new Pool({
        user: postgresConfig.username,
        password: postgresConfig.password,
        host: postgresConfig.host,
        port: postgresConfig.port,
        database: postgresConfig.database,
    })
    const postgresDialect = new PostgresDialect({ pool })

    return new Kysely<Database>({ dialect: postgresDialect })
}

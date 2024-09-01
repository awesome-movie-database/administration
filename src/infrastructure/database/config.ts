import { envVarByKey } from "src/infrastructure/getEnv";


export function postgresConfigFromEnv(): PostgresConfig {
    return new PostgresConfig(
        envVarByKey("POSTGRES_USERNAME"),
        envVarByKey("POSTGRES_PASSWORD"),
        envVarByKey("POSTGRES_HOST"),
        Number.parseInt(envVarByKey("POSTGRES_PORT")),
        envVarByKey("POSTGRES_DATABASE"),
    )
}


export class PostgresConfig {
    constructor(
        readonly username: string,
        readonly password: string,
        readonly host: string,
        readonly port: number,
        readonly database: string,
    ) {}
}

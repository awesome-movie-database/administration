import { env } from "process";


/**
* Returns value from env vars by key.
* @throws {Error} If value doesn't exist.
*/
export function envVarByKey(key: string): string {
    const value = env[key]
    if (value === undefined) {
        throw new Error(`Env var ${key} doesn't exist`)
    }
    return value
}

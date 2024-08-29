import { env } from "process";


export function envVarByKey(key: string): string {
    const value = env[key]
    if (value === undefined) {
        throw new Error(`Env var ${key} doesn't exist`)
    }
    return value
}

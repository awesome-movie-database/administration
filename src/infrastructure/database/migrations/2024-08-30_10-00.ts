import { Kysely } from "kysely";


export async function up(database: Kysely<unknown>): Promise<void> {
    await database.schema
        .createTable("users")
        .addColumn("id", "uuid", (column) => column.primaryKey())
        .addColumn("name", "varchar", (column) => column.notNull().unique())
        .addColumn("email", "varchar", (column) => column.unique())
        .addColumn("telegram", "varchar", (column) => column.unique())
        .addColumn("is_active", "boolean", (column) => column.notNull())
        .execute()
}


export async function down(database: Kysely<unknown>): Promise<void> {
    await database.schema.dropTable("users").execute()
}

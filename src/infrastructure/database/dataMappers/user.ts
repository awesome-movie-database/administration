import { Transaction } from "kysely";

import { UserId, User } from "src/domain";
import { Database } from "src/infrastructure/database/kysely";


interface UserRow {
    id: string,
    name: string,
    email: string | null,
    telegram: string | null,
    isActive: boolean,
}


export class UserMapper {
    constructor(
        protected readonly transaction: Transaction<Database>,
    ) {}

    async byId(id: UserId): Promise<User | null> {
        const userRow = await this.transaction
            .selectFrom("users as u")
            .selectAll()
            .where("u.id", "=", id.value)
            .limit(1)
            .executeTakeFirst()

        if (userRow) {
            return this.rowToUser(userRow)
        }
        return null
    }

    async byName(name: string): Promise<User | null> {
        const userRow = await this.transaction
            .selectFrom("users as u")
            .selectAll()
            .where("u.name", "=", name)
            .limit(1)
            .executeTakeFirst();

        if (userRow) {
            return this.rowToUser(userRow)
        }
        return null
    }

    async byEmail(email: string): Promise<User | null> {
        const userRow = await this.transaction
            .selectFrom("users as u")
            .selectAll()
            .where("u.email", "=", email)
            .limit(1)
            .executeTakeFirst();

        if (userRow) {
            return this.rowToUser(userRow)
        }
        return null
    }

    async byTelegram(telegram: string): Promise<User | null> {
        const userRow = await this.transaction
            .selectFrom("users as u")
            .selectAll()
            .where("u.telegram", "=", telegram)
            .limit(1)
            .executeTakeFirst();

        if (userRow) {
            return this.rowToUser(userRow)
        }
        return null
    }

    async save(user: User): Promise<void> {
        await this.transaction
            .insertInto("users")
            .values({
                id: user.id.value,
                name: user.name,
                email: user.email,
                telegram: user.telegram,
                isActive: user.isActive,
            })
            .execute()
    }

    protected rowToUser(row: UserRow): User {
        return new User({
            id: new UserId(row.id),
            name: row.name,
            email: row.email,
            telegram: row.telegram,
            isActive: row.isActive,
        })
    }
}

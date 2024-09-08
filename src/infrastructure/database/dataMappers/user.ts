import { Transaction } from "kysely";

import { UserId, User } from "src/domain";
import { UserGateway } from "src/application";
import { Database } from "src/infrastructure/database/kysely";


interface UserRow {
    id: string,
    name: string,
    email: string | null,
    telegram: string | null,
    isActive: boolean,
}


export class UserMapper implements UserGateway {
    constructor(
        protected readonly transaction: Transaction<Database>,
    ) {}

    async byId(id: UserId, acquire: boolean): Promise<User | null> {
        let expression = this.transaction
            .selectFrom("users as u")
            .selectAll()
            .where("u.id", "=", id.value)
            .limit(1)

        if (acquire) {
            expression = expression.forUpdate()
        }
        const userRow = await expression.executeTakeFirst()

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

    async update(user: User): Promise<void> {
        await this.transaction
            .updateTable("users as u")
            .set({
                "name": user.name,
                "email": user.email,
                "telegram": user.telegram,
                "isActive": user.isActive,
            })
            .where("u.id", "=", user.id.value)
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

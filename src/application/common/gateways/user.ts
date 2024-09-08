import { UserId, User } from "src/domain";


export interface UserGateway {
    byId(id: UserId, acquire: boolean): Promise<User | null>;
    byName(name: string): Promise<User | null>;
    byEmail(email: string): Promise<User | null>;
    byTelegram(telegram: string): Promise<User | null>;
    save(user: User): Promise<void>;
    update(user: User): Promise<void>;
}

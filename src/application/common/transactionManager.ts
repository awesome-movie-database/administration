export interface TransactionManager {
    commit(): Promise<void>;
}

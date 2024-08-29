import { TransactionManager } from "src/application/common/transactionManager";
import { CommandProcessor } from "./command";


export class TransactionProcessor<C = any, R = any> {
    constructor(
        protected readonly processor: CommandProcessor<C, R>,
        protected readonly txManager: TransactionManager,
    ) {}

    async process(command: C): Promise<R> {
        const result = await this.processor.process(command)
        await this.txManager.commit()
        return result
    }
}

import { TransactionManager } from "src/application/common/transactionManager";
import { CommandProcessor } from "./command";


export class TransactionProcessor<C = any, R = any> {
    protected readonly processor: CommandProcessor<C, R>
    protected readonly txManager: TransactionManager

    constructor(
        transactionProcessorProps: {
            processor: CommandProcessor<C, R>,
            txManager: TransactionManager,
        },
    ) {
        this.processor = transactionProcessorProps.processor
        this.txManager = transactionProcessorProps.txManager
    }

    async process(command: C): Promise<R> {
        const result = await this.processor.process(command)
        await this.txManager.commit()
        return result
    }
}

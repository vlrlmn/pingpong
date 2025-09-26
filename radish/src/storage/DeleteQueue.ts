import RecordValue from "../pkg/Record";

export default class DeleteQueue {  
    private queue: Record<number,Array<RecordValue>> = {};
    private interval: NodeJS.Timeout | null = null;
    private itemsCount: number = 0;
    private onRemoveHandler: (item:RecordValue) => void;

    constructor(onRemoveHandler:(item:RecordValue) => void) {
        this.onRemoveHandler = onRemoveHandler;
    }

    public add(value: RecordValue): void {

        if (!value.expireAt) {
            return ;
        }

        const expireAtSeconds = value.expireAt;
        if (!this.queue[expireAtSeconds]) {
            this.queue[expireAtSeconds] = [];
        }
        this.queue[expireAtSeconds].push(value);
        this.itemsCount++;

        if (!this.interval) {
            this.startInterval();
        }
    }

    public startInterval(): void {
        let iterTime = Math.round(new Date().getTime() / 1000)
        this.interval = setInterval(() => {
            if (this.itemsCount > 0) {
                const itemsToDelete = this.queue[iterTime]
                if (itemsToDelete) {
                    itemsToDelete.forEach((item) => {
                        this.onRemoveHandler(item);
                        this.itemsCount--;
                    })

                    delete this.queue[iterTime];
                } 
                iterTime++;
            } else {
                this.stopInterval();
            }
        }, 1000);
    }

    private stopInterval(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
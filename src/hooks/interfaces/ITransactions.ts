type TransactionTypes = "deposit" | "withdraw";

export interface ITransaction {
    id: number;
    title: string;
    type: TransactionTypes;
    category: string;
    amount: string;
    date: string;
}

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import api from "../services/api";
import { ITransaction } from "./interfaces/ITransactions";

type ITransactionInput = Pick<
    ITransaction,
    "title" | "type" | "amount" | "category" | "date" | "createdAt"
>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: ITransaction[];
    createTransaction: (transaction: ITransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    useEffect(() => {
        api
            .get("list/")
            .then((response) => setTransactions(response.data));
    }, []);

    async function createTransaction(transactionInput: ITransactionInput) {
        const response = await api.post("register/", {
            ...transactionInput,
        });

        const { transaction } = response.data;

        setTransactions([...transactions, transaction]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

import { useTransactions } from "../../hooks/useTransactions";
import api from "../../services/api";
import { Container } from "./styles";
import { FaTrash } from "react-icons/fa";

export function TransactionsTable() {
    const { transactions } = useTransactions();

    async function deleteOrder(id: any) {
        try {
            await api.delete(`/delete/${id}`);
            alert("Transação excluída com sucesso");
            history.go();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                {new Intl.DateTimeFormat("pt-BR").format(
                                    new Date(transaction.date)
                                )}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => deleteOrder(transaction.id)}
                                >
                                    Deletar <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}

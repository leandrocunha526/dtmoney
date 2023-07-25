import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function Summary() {
    const { transactions } = useTransactions();
    // Ensure transactions array is valid
    if (!Array.isArray(transactions)) {
      return null; // or handle the error gracefully
    }

    const summary = transactions.reduce(
        (acc, transaction) => {
            const amount = Number(transaction.amount); // Ensure amount is converted to a number

            if (isNaN(amount)) {
                return acc; // Skip the transaction if amount is NaN
            }

            if (transaction.type === 'deposit') {
                acc.deposits += amount;
                acc.total += amount;
            } else {
                acc.withdraw += amount;
                acc.total -= amount;
            }

            return acc;
        },
        {
            deposits: 0,
            withdraw: 0,
            total: 0,
        }
    );
    return (
        <Container>
            <div>
                <header>
                    <p>Entrada</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {
                        new Intl.NumberFormat('pt-BR', {
                            style: "currency",
                            currency: "BRL"
                        }).format(summary.deposits)
                    }
                </strong>
            </div>
            <div>
                <header>
                    <p>Saída</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>
                    {
                        new Intl.NumberFormat('pt-BR', {
                            style: "currency",
                            currency: "BRL"
                        }).format(summary.withdraw)
                    }
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Saídas" />
                </header>
                <strong>
                    {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }).format(summary.total)}
                </strong>
            </div>
        </Container>
    )
}
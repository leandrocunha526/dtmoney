import { useState } from "react";
import { Header } from "../../components/Header";
import { NewTransactionModal } from "../../components/NewTransactionModal";
import { Summary } from "../../components/Summary";
import { TransactionsTable } from "../../components/TransactionsTable";
import { Container } from "./styles";

export default function Dashboard() {
    const [isNewTransactionModalOpen, setIsNewTrasanctionOpen] = useState(false);

    function handleOpenNewTransactionModal() {
        setIsNewTrasanctionOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTrasanctionOpen(false);
    }
    return (
        <Container>
            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
            <NewTransactionModal
                isOpen={isNewTransactionModalOpen}
                onRequestClose={handleCloseNewTransactionModal}
            />
            <Summary />
            <TransactionsTable />
        </Container>
    );
}

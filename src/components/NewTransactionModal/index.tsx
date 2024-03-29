import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { useTransactions } from "../../hooks/useTransactions";
import { INewTransactionModalProps } from "./@interfaces";
import { TransactionTypes } from "./@types";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export function NewTransactionModal({
    isOpen,
    onRequestClose }: INewTransactionModalProps) {
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState<TransactionTypes>("deposit");
    const [date, setDate] = useState("");

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
            date
        });

        setTitle("");
        setAmount("");
        setCategory("");
        setType("deposit");
        setDate("");
        alert("Salvo com sucesso");
        history.go();
    }
    return (
        <Modal
            isOpen={isOpen}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar o modal"></img>
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h1>Cadastrar transação</h1>
                <input
                    type="text"
                    name="title"
                    required
                    id="title"
                    placeholder="Título"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <input
                    type="number"
                    name="amount"
                    required
                    id="amount"
                    placeholder="Valor"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                />
                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        isActive={type === "deposit"}
                        onClick={() => setType("deposit")}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        isActive={type === "withdraw"}
                        onClick={() => setType("withdraw")}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input
                    type="text"
                    name="category"
                    required
                    id="category"
                    placeholder="Categoria"
                    value={category}
                    onChange={(event) => setCategory((event.target.value))}
                />
                <input
                    type="datetime-local"
                    required
                    name="date"
                    id="date"
                    value={date}
                    onChange={(event) => setDate((event.target.value))}
                />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}

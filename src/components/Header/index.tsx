import logoImg from "../../assets/logo.svg";
import { IHeaderProps } from "./@interfaces";
import { Container, Content } from "./styles";

export function Header({ onOpenNewTransactionModal }: IHeaderProps) {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dtmoney" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    )
}

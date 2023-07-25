import { useEffect } from "react";
import { Container } from "./styles";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";

type FormValues = {
    title: string;
    amount: number;
    category: string;
    date: Date;
    type: string;
    id: number;
};

export function EditForm() {
    const { id } = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = data => {
        api.put(`/update/${id}/`, data).then(() => {
            alert("Salvo com sucesso");
            navigate("/");
            history.go();
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        api.get(`/details/${id}/`).then((result) => {
            setValue("id", result.data.id);
            setValue("title", result.data.title);
            setValue("amount", result.data.amount);
            setValue("type", result.data.type);
            setValue("category", result.data.category);
            setValue("date", result.data.date);
        });
    });

    return (
        <Container onSubmit={handleSubmit(onSubmit)}>
            <Link to="/"><GrPrevious /></Link>
            <h1>Atualizar transação</h1>
            <input
                type="text"
                id="title"
                {...register("title", { required: true })}
                placeholder="Título"
            />
            {errors.title && errors.title.type === "required" && <span style={{ color: "red" }}>Título é um campo obrigatório</span>}
            <input
                type="text"
                id="amount"
                {...register("amount", {
                    required: true
                })}
                placeholder="Valor"
            />
            {errors.amount && errors.amount.type === "required" && <span style={{ color: "red" }}>Valor é um campo obrigatório</span>}

            <select
                id="type"
                {...register("type", { required: true })}
            >
                <option value="">Selecione um tipo de transação</option>
                <option value="deposit">Entrada</option>
                <option value="withdraw">Saída</option>
            </select>
            {errors.type && errors.type.type === "required" && <span style={{ color: "red" }}>Tipo de transação é um campo obrigatório</span>}

            <input
                type="text"
                id="category"
                placeholder="Categoria"
                {...register("category", { required: true })}
            />
            {errors.category && errors.category.type === "required" && <span style={{ color: "red" }}>Categoria é um campo obrigatório</span>}
            <input
                type="datetime-local"
                id="date"
                {...register("date", { required: true, valueAsDate: true })}
            />
            {errors.date && errors.date.type === "required" && <span style={{ color: "red" }}>Data é um campo obrigatório</span>}
            <button type="submit">Atualizar</button>
        </Container >
    )
}

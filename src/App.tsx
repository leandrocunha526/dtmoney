import { TransactionsProvider } from "./hooks/useTransactions";
import Dashboard from "./pages/Dashboard";
import { GlobalStyle } from "./styles/global";
import { Route, Routes } from "react-router-dom";
import { EditForm } from "./pages/EditForm";

function App() {

    return (
        <TransactionsProvider>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<h1>Error 404 Not found</h1>} />
                <Route path="/:id" element={<EditForm />} />
            </Routes>
            <GlobalStyle />
        </TransactionsProvider>
    )
}

export default App;

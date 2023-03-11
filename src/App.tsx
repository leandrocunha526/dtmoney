import { TransactionsProvider } from "./hooks/useTransactions";
import Dashboard from "./pages/Dashboard";
import { GlobalStyle } from "./styles/global";
import { Route, Routes } from "react-router-dom";

function App() {

    return (
        <TransactionsProvider>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<h1>Error 404 Not found</h1>} />
            </Routes>
            <GlobalStyle />
        </TransactionsProvider>
    )
}

export default App;

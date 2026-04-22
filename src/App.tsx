import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { InvoiceProvider } from './context/InvoiceContext';
import { Layout } from './components/layout/Layout';
import { InvoiceList } from './pages/InvoiceList';     // <-- Added curly braces here
import { InvoiceDetail } from './pages/InvoiceDetail'; // <-- Added curly braces here

function App() {
    return (
        <ThemeProvider>
            <InvoiceProvider>
                <Router>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<InvoiceList />} />
                            <Route path="/invoice/:id" element={<InvoiceDetail />} />
                        </Route>
                    </Routes>
                </Router>
            </InvoiceProvider>
        </ThemeProvider>
    );
}

export default App;
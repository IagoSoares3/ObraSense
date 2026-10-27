import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import AgenteIA from './pages/AgenteIA'; // <--- Importamos a nova página
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agente" element={<AgenteIA />} /> {/* <--- Nova rota */}
      </Routes>
    </BrowserRouter>
  );
}
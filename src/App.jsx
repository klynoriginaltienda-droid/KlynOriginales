import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './hooks/useApp';
import FloatingElements from './pages/FloatingElements';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Reclamaciones from './pages/Reclamaciones';
import Policies from './pages/Policies';

export default function App() {
  return (
    <AppProvider>
      <FloatingElements />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/politicas" element={<Policies />} />
        <Route path="/reclamaciones" element={<Reclamaciones />} />
      </Routes>
    </AppProvider>
  );
}
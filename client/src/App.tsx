// src/App.jsx (Exemplo de roteamento)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Ranking from './pages/Ranking';
import Metas from './pages/Metas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/metas" element={<Metas />} />
      </Routes>
    </Router>
  );
}
export default App;
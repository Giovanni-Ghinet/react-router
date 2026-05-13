import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import ChiSiamo from './pages/ChiSiamo';
import Prodotti from './pages/Prodotti';
import ProdottoDettaglio from './pages/ProdottoDettaglio';
import NotFound from './pages/NotFound'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/prodotti" element={<Prodotti />} />
        <Route path="/prodotti/:id" element={<ProdottoDettaglio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



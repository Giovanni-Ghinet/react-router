import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function ProdottoDettaglio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prodotto, setProdotto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);
  const [ultimoId, setUltimoId] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Errore nel caricamento');
        return res.json();
      })
      .then((data) => {
        setProdotto(data);
        setLoading(false);
      })
      .catch((err) => {
        setErrore(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Errore nel caricamento dei prodotti');
        return res.json();
      })
      .then((data) => {
        const ids = data.map((item) => Number(item.id));
        setUltimoId(Math.max(...ids));
      })
      .catch(() => {
        setUltimoId(null);
      });
  }, []);

  if (loading) return <div className="container mt-5">Caricamento...</div>;
  if (errore) return <div className="container mt-5"><div className="alert alert-danger">{errore}</div></div>;
  if (!prodotto) return <div className="container mt-5">Prodotto non trovato.</div>;

  const idNum = Number(id);

  return (
    <div className="container mt-5">
      <h1>{prodotto.title}</h1>
      <div className="row">
        <div className="col-md-4">
          <img
            src={prodotto.image}
            alt={prodotto.title}
            className="img-fluid"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-8">
          <p className="fw-bold fs-4">€ {prodotto.price}</p>
          <p>{prodotto.description}</p>
          <p className="text-muted">Categoria: {prodotto.category}</p>

          <div className="mt-4">
            <button
              className="btn btn-secondary me-2"
              onClick={() => navigate(`/prodotti/${idNum - 1}`)}
              disabled={idNum <= 1}
            >
              Prodotto precedente
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate(`/prodotti/${idNum + 1}`)}
              disabled={ultimoId ? idNum >= ultimoId : false}
            >
              Prodotto successivo
            </button>
          </div>

          <div className="mt-3">
            <Link to="/prodotti" className="btn btn-primary">Torna a tutti i prodotti</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdottoDettaglio;

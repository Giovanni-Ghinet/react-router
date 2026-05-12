import { useState, useEffect } from 'react';

function Prodotti() {
  const [prodotti, setProdotti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Errore nel caricamento');
        return res.json();
      })
      .then((data) => {
        setProdotti(data);
        setLoading(false);
      })
      .catch((err) => {
        setErrore(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Caricamento...</span></div></div>;
  if (errore) return <div className="container mt-5"><div className="alert alert-danger">{errore}</div></div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">I nostri prodotti</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {prodotti.map((prodotto) => (
          <div className="col" key={prodotto.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={prodotto.image}
                className="card-img-top p-3"
                alt={prodotto.title}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prodotto.title}</h5>
                <p className="card-text text-success fw-bold mt-auto">€ {prodotto.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prodotti;
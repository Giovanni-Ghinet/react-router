import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-1">404</h1>
      <p className="lead">Ops! La pagina che stai cercando non esiste.</p>
      <Link to="/" className="btn btn-primary">Torna alla Home</Link>
    </div>
  );
}

export default NotFound;
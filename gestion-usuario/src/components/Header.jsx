import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Header.css';

function Header() {

   
  return (
    <>
         <header className="encabezado-principal text-white py-3">
        <div className="text-center">
          <h1 className="m-0">Gestión de Usuarios - Sistema CRUD</h1>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg mi-navbar">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Usuarios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/form">Datos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
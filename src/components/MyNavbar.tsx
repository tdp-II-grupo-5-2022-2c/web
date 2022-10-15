import React, {useState} from 'react';
import {ROUTES} from "../routes/RoutesNames";

const MyNavbar = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Figus Qatar</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href={ROUTES.HOME}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={ROUTES.MYSTICKERS}>Mis Figus</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={ROUTES.DAILYPACKET}>Paquete diario</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={ROUTES.MYPROFILE}>Mi perfil</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={ROUTES.MYALBUM}>Mi Album</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={ROUTES.MYCOMMUNITIES}>Mis Comunidades</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={ROUTES.MY_EXCHANGES}>Mis Intercambios</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default MyNavbar;

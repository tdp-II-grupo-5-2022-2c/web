import React, {useState} from 'react';
import {ROUTES} from "../routes/RoutesNames";

const MyNavbar = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-gradient-orange mb-4">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">{"FIFA WORLD CUP\nQat_ar2022"}</a>
          <div className="collapse navbar-collapse d-flex">
              <a className="nav-link text-white" href={ROUTES.HOME}>Home</a>
              <a className="nav-link text-white" href={ROUTES.MYSTICKERS}>Mis figus</a>
              <a className="nav-link text-white" href={ROUTES.DAILYPACKET}>Paquete diario</a>
              <a className="nav-link text-white" href={ROUTES.MYPROFILE}>Mi perfil</a>
              <a className="nav-link text-white" href={ROUTES.MYALBUM}>Mi album</a>
              <a className="nav-link text-white" href={ROUTES.MYCOMMUNITIES}>Mis comunidades</a>
              <a className="nav-link text-white" href={ROUTES.MY_EXCHANGES}>Mis intercambios</a>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default MyNavbar;

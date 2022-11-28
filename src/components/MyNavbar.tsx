import React from 'react';
import {ROUTES} from "../routes/RoutesNames";

const MyNavbar = (args: any) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-gradient-orange h-10vh">
        <div className="container-fluid h-10vh">
          <img
              src={require("../assets/img/orange-ball.png")}
              draggable={false}
              style={{
                maxHeight: "10rem",
                maxWidth: "10rem",
                pointerEvents: "none",
                userSelect: "none",
                top: 0,
                objectFit: "cover",
                transform: "scaleX(-1) scaleY(-1)",
                objectPosition:"20% 10%",
                overflow: "hidden"
              }}
          />
          <a className="navbar-brand text-white" href="/">
            <img src={require("../assets/img/qatar_logo.png")}
                 style={{
                   maxWidth: "10rem",
                   maxHeight: "10rem"
                 }}
            />
          </a>
          <div className="collapse navbar-collapse d-flex overflow-hidden">
              <a className="nav-link text-white" href={ROUTES.HOME}>Inicio</a>
              <a className="nav-link text-white" href={ROUTES.MYSTICKERS}>Mis Figuritas</a>
              <a className="nav-link text-white" href={ROUTES.OPEN_PACKET}>Abrir Paquete</a>
              <a className="nav-link text-white" href={ROUTES.MYPROFILE}>Mi Perfil</a>
              <a className="nav-link text-white" href={ROUTES.MYALBUM}>Mi Album</a>
              <a className="nav-link text-white" href={ROUTES.MYCOMMUNITIES}>Mis Comunidades</a>
              <a className="nav-link text-white" href={ROUTES.MY_EXCHANGES}>Mis Intercambios</a>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default MyNavbar;

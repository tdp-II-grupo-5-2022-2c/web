import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyNavbar from "./components/MyNavbar";
import {useUser} from "./context/UserContext";
import {ROUTES} from "./routes/RoutesNames";

import './assets/css/argon-dashboard-react.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

function App() {

  const {mail, logout} = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error(error)
    }

    navigate(ROUTES.SIGNIN);
  };

  const handleDailyPacket = () => {
    navigate(ROUTES.DAILYPACKET)
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="container card">
        <h1>Bienvenido {mail}</h1>
        <button className="btn btn-primary my-1" onClick={() => {navigate(ROUTES.MYSTICKERS)}}> Mis figus </button>
        <button className="btn btn-primary my-1" onClick={handleDailyPacket}> Paquete diario </button>
        <button className="btn btn-secondary my-1" onClick={handleLogout}> Cerrar sesión </button>
      </div>
    </React.Fragment>

  );
}

export default App;

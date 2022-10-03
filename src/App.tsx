import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyNavbar from "./components/MyNavbar";
import {useUser} from "./context/UserContext";
import {ROUTES} from "./routes/RoutesNames";


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
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <button className="btn btn-primary" onClick={() => {navigate(ROUTES.MYSTICKERS)}}> Mis figus </button>
            </div>
            <div className="col">
              <button className="btn btn-primary" onClick={handleDailyPacket}> Paquete diario </button>
            </div>
            <div className="col">
              <button className="btn btn-secondary" onClick={handleLogout}> Cerrar sesión </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
}

export default App;

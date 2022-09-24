import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyNavbar from "./components/MyNavbar";
import {useUser} from "./context/UserContext";

function App() {

  const {mail, logout} = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error(error)
    }

    navigate('/sign-in');
  };

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="container card">
        <h1>Bienvenido {mail}</h1>
        <button className="btn btn-primary my-1" onClick={() => {navigate('/my-stickers')}}> Mis figus </button>
        <button className="btn btn-secondary my-1" onClick={handleLogout}> Cerrar sesión </button>
      </div>
    </React.Fragment>

  );
}

export default App;

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
      <h1>Welcome {mail}</h1>
      <button onClick={handleLogout}> Logout </button>
      <button onClick={() => {navigate('/my-stickers')}}> Mis figus </button>
    </React.Fragment>

  );
}

export default App;

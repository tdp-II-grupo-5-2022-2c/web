import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyNavbar from "./components/MyNavbar";
import {useAuth} from './context/authContext'

function App() {

  const {user, logout} = useAuth();
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
      <h1>Welcome {user.displayName || user.email}</h1>
      <button onClick={handleLogout}> Logout </button>
      <button onClick={() => {navigate('/my-stickers')}}> MY stickers </button>
    </React.Fragment>

  );
}

export default App;

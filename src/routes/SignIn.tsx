import React, {Component, useState} from "react";
import '../css/App.css';
import MyNavbar from "../components/MyNavbar";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState();
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({target: {name, value}}: any) => {
      console.log(name, value)
      setUser({...user, [name]: value});
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // ToDo sacar esta linea para que vuelva a estado normal despues de submit
    // console.log(user);
    setError(undefined);

    try {
      console.log(user);
      await login(user.email, user.password); 
      navigate('/');
    } catch (error: any) {
      // ToDo agregar manejo de errores
      console.log(error)
      setError(error.message);
    }      
  }
  
  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate('/');  
    } catch (error: any) {
      setError(error.message)
    }
    
  };

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="body text-center">
        {error && <p>{error}</p>}
        <main className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit}>
            <img className="mb-4" src={require("../res/img/qatar.png")} alt="" width="72" height="57"/>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
              <input type="email" name='email' className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange}/>
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" name='password' className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChange}/>
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            
          </form>
          <button onClick={handleGoogleSignIn}> Login with google </button>
          <button onClick={handleRegister}> Register </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
        </main>
      </div>
    </React.Fragment>
  )
}

import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export function Register() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState();

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleChange = ({target: {name, value}}: any) => {
        setUser({...user, [name]: value});
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault(); // ToDo sacar esta linea para que vuelva a estado normal despues de submit
        // console.log(user);
        setError(undefined);

        try {
            await signUp(user.email, user.password); 
            navigate('/');
        } catch (error: any) {
            // ToDo agregar manejo de errores
            setError(error.message);
        }
        
    }

    // ToDo poner bonito
    return (
        <div>
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='hpotter@hogwarts.edu' onChange={handleChange}/>

                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' placeholder='******' onChange={handleChange}/>

                <button>Register</button>
            </form>
        </div>
        
    )

}
import { Navigate } from "react-router-dom";
import {useUser} from "../context/UserContext";

export function ProtectedRoute({children} : any) {
    const user = useUser();
    console.log("PROTECTED ROUTE")
    console.log(user)
    if (!user.id) {
        // TODO: si en vez de null pongo que navege a signin tiene un comportamiento raro donde el useUser
        // me devuelve null en el el user haciendo que "pierdas" la sesion y te tengas que volver a logear
        // a pesar de que el context tiene al user
        return null
    }

    return <>{children}</>
}

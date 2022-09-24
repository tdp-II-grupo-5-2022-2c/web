import { Navigate } from "react-router-dom";
import {useUser} from "../context/UserContext";

export function ProtectedRoute({children} : any) {
    const user = useUser();
    if (!user.id) {
        return <Navigate to="/sign-in"/>
    }

    return <>{children}</>
}

import {useUser} from "../context/UserContext";
import {Navigate, useLocation} from "react-router-dom";
import React from "react";

export function ProtectedRoute({children}: any) {
  const user = useUser();
  const location = useLocation();

  if (user.isAuthed() === undefined) {
    return null; //TODO: Podriamos poner un Spinner aca
  }

  return (
      <React.Fragment>
        {user.isAuthed() ? (
            <>{children}</>
        ) : (
            <Navigate to="/sign-in" replace state={{path: location.pathname}}/>
        )}
      </React.Fragment>
  )
}

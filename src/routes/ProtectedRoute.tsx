import {useUser} from "../context/UserContext";
import {Navigate, useLocation} from "react-router-dom";
import React from "react";
import MySpinner from "../components/spinner/MySpinner";

export function ProtectedRoute({children}: any) {
  const user = useUser();
  const location = useLocation();

  if (user.isAuthed() === undefined) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100vh">
        <MySpinner message={"Espere unos momentos..."}/>
      </div>
    )
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

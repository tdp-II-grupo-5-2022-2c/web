import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import {Button} from "reactstrap";

const MyExchanges = () => {
  const user = useUser();

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="row">
        <div className="col-md-2">
          <div className="row"></div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <h2>Mis Intercambios</h2>

          </div>
        </div>
        <div className="col-md-2">
          <div className="row">
            <Button onClick={undefined}>Crear Intercambio</Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}

export default MyExchanges

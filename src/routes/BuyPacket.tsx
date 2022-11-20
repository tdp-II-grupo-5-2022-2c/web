import React from "react";
import MyNavbar from "../components/MyNavbar";

const BuyPacket = () => {

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="container-fluid bg-gradient-orange h-90vh">
        <div className="row">
          <h1 className="text-center text-white mt-5">COMPRAR PAQUETE</h1>
        </div>
        <div className="row">
          <div className="container-fluid bg-gradient-orange h-90vh">
            <div className="row">
              <div className="h-65vh border rounded text-center">
                <div className="d-flex justify-content-center align-items-center h-65vh">
                  <h1 className="text-white">Proximamente...</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}

export default BuyPacket

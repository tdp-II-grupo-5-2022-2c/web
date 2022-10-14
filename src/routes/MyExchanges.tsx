import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import {Button} from "reactstrap";
import Sticker, {ISticker} from "../components/Sticker";

const MyExchanges = () => {
  const user = useUser();

  const [exchangeStickers, setExchangeStickers] = useState<ISticker[]>([])

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="row">
        <div className="col-md-2">
          <div className="row"></div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <h2>Comunidades de las que soy administrador</h2>
            {exchangeStickers.map((sticker, index) =>
              <div key={sticker.id} className="col col-md-3">
                <Sticker player={sticker}/>
              </div>
            )}
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

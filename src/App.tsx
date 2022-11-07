import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyNavbar from "./components/MyNavbar";
import {useUser} from "./context/UserContext";
import {ROUTES} from "./routes/RoutesNames";
import {Button} from "reactstrap";
import {globalButtonsStyle, globalStickerStyles} from "./res/globalStyles";


function App() {

  const {mail} = useUser();
  const navigate = useNavigate();

  const handleMyStickers = () => {
    navigate(ROUTES.MYSTICKERS)
  }

  const handleDailyPacket = () => {
    navigate(ROUTES.DAILYPACKET)
  }

  const handleMyAlbum = () => {
    navigate(ROUTES.MYALBUM)
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="container text-center">
        <h1>¡ Bienvenido {mail} !</h1>

        <div className="row">
            <div className="col-md-4">
              <div className="card" onClick={handleMyStickers}>
                <div className="card-body">
                  <img src={"/images/ARG10.png"} style={globalStickerStyles.sticker}/>
                  <Button style={globalButtonsStyle.alternative}>
                    <p className="m-0 text-white">Mis figuritas</p>
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" onClick={handleMyAlbum}>
                <div className="card-body text-center">
                  <img src={"/images/album.png"} style={globalStickerStyles.sticker}/>
                  <Button style={globalButtonsStyle.alternative}>
                    <p className="m-0 text-white">Mi album</p>
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" onClick={handleDailyPacket}>
                <div className="card-body text-center">
                  <img src={"/images/daily_packet.png"} style={globalStickerStyles.sticker}/>
                  <Button style={globalButtonsStyle.alternative}>
                    <p className="m-0 text-white">Paquete diario</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </React.Fragment>

  );
}

export default App;

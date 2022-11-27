import React, {useEffect, useState} from 'react';
import client from "./services/config"
import {getFCMToken} from "./firebase"
import { useNavigate } from 'react-router-dom';
import MyNavbar from "./components/MyNavbar";
import {useUser} from "./context/UserContext";
import {ROUTES} from "./routes/RoutesNames";
import {Button, Col, Row, Tooltip, UncontrolledTooltip} from "reactstrap";
import {globalButtonsStyle, globalStickerStyles} from "./res/globalStyles";
import {claimDailyPackages} from "./services/apicalls";
import Error from "./components/modals/Error";
import {HomeStrings} from "./res/strings";
import Success from "./components/modals/Success";
import Countdown from "react-countdown";


function App() {

  const user = useUser();
  const navigate = useNavigate();
  const initialModalState = {
    header: "",
    body: "",
  };

  const [errorModal, setErrorModal] = useState(initialModalState);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const [successModal, setSuccessModal] = useState(initialModalState);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const handleMyStickers = () => {
    navigate(ROUTES.MYSTICKERS)
  }

  const handleDailyPacket = () => {
    navigate(ROUTES.OPEN_PACKET)
  }

  const handleMyAlbum = () => {
    navigate(ROUTES.MYALBUM)
  }

  const onClickDailyPackage = () => {
    claimDailyPackages(user._id).then(response => {
      if (response.data === null && response.statusCode === 400) {
        setErrorModal({
          header: HomeStrings.DAILY_PACKAGE_ERROR_HEADER,
          body: HomeStrings.DAILY_PACKAGE_NOT_AVAILABLE
        });
        setShowErrorModal(true);
      } else if (response.data == null && response.statusCode > 400) {
        setErrorModal({
          header: HomeStrings.DAILY_PACKAGE_ERROR_HEADER,
          body: HomeStrings.DAILY_PACKAGE_UNEXPECTED_ERROR
        });
        setShowErrorModal(true);
      } else {
        setSuccessModal({
          header: HomeStrings.DAILY_PACKAGE_SUCCESS_HEADER,
          body: HomeStrings.DAILY_PACKAGE_SUCCESS
        });
        setShowSuccessModal(true);
      }
      if (response.data !== null) {
        user.updateUser(response.data)
      }
    })
  }

  const getDailyPacketDate = () => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    return date;
  }

  useEffect(() => {
    getFCMToken()
      .then( (fcmToken) => {
        client.put(`/users/${user._id}`, { fcmToken });
      });
  }, []);

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="container text-center">
        <h1>¡ Bienvenido {user.mail} !</h1>

        <div className="row">
            <div className="col-md-4">
              <div className="card" onClick={handleMyStickers}>
                <div className="card-body">
                  <img src={"/images/ARG11.png"} style={globalStickerStyles.sticker}/>
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
              <div className="card">
                <div className="card-body text-center">
                  <Row>
                    <Col>
                  <img src={"/images/daily_packet.png"} style={globalStickerStyles.sticker}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                  <Button
                          style={globalButtonsStyle.alternative}
                          disabled={!user.has_packages_available}
                          onClick={onClickDailyPackage}>
                      <p className="m-0 text-white">Paquete diario</p>
                  </Button>
                    </Col>
                  </Row>
                  {!user.has_packages_available &&
                      <Row>
                        <Countdown date={getDailyPacketDate()} renderer={({ hours, minutes, seconds, completed }) => {
                          return (
                              <span className="text-qatar-secondary">
                                {hours}H  {minutes}M  {seconds}S
                              </span>
                          );
                        }} />
                      </Row>
                  }
                </div>
              </div>
            </div>
          </div>
        <Error modal={errorModal} isOpen={showErrorModal} onAccept={() => setShowErrorModal(false)}/>
        <Success modal={successModal} isOpen={showSuccessModal} onAccept={() => {
          setShowSuccessModal(false);
          handleDailyPacket();
        }}/>
      </div>
    </React.Fragment>

  );
}

export default App;

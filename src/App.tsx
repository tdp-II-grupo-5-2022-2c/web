import React, {useEffect, useState} from 'react';
import client from "./services/config"
import {getFCMToken} from "./firebase"
import { useNavigate } from 'react-router-dom';
import MyNavbar from "./components/MyNavbar";
import {useUser} from "./context/UserContext";
import {ROUTES} from "./routes/RoutesNames";
import {Button, Card, Col, Container, Row, Tooltip, UncontrolledTooltip} from "reactstrap";
import {globalButtonsStyle, globalStickerStyles} from "./res/globalStyles";
import {claimDailyPackages} from "./services/apicalls";
import Error from "./components/modals/Error";
import {HomeStrings} from "./res/strings";
import Success from "./components/modals/Success";
import Countdown from "react-countdown";
import Sticker from "./components/stickers/Sticker";
import Packet from "./components/Packet";


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
    if (!user.has_daily_packages_available) {
      return;
    }

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
    date.setHours(6);
    date.setMinutes(0);
    date.setSeconds(0);
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
      <Container fluid className="bg-gradient-orange h-90vh overflow-auto">

        <Row>
          <Col className="mt-5 d-flex" lg={3} md={12}>
            <h1 className="text-white text-start">INICIO</h1>
          </Col>
        </Row>
        <Row className="align-items-center justify-content-center mb-4">
          <Col className="text-center text-lg-right text-xl-right text-sm-start mb-1 mt-lg-5" lg={3} md={5} sm={5}>
            <h1 className="text-white text-center">¡Bienvenido {user.name}!</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <Row className="mb-3 m-0 p-0 justify-content-center">
              <Col className="d-flex col-2 justify-content-center">
                <span className="text-white text-center" style={{fontSize: 25}}>Mis Figuritas</span>
              </Col>
            </Row>
            <Row className="m-0 p-0 justify-content-center">
              <div className={"col col-md-4 col-sm-12 d-flex justify-content-center floating"}
                   style={{cursor: 'pointer'}}
                   onClick={handleMyStickers}>
                <img src={require("./assets/img/stickers/ARG/ARG10.png")}
                     style={globalStickerStyles.sticker}
                />
              </div>
            </Row>
          </Col>
          <Col>
            <Row className="mb-3 m-0 p-0 justify-content-center">
              <Col className="d-flex col-2 justify-content-center">
                <span className="text-white text-center" style={{fontSize: 25}}>Mi Album</span>
              </Col>
            </Row>
            <Row className="m-0 p-0 justify-content-center">
              <div className={"col col-md-4 col-sm-12 d-flex justify-content-center floating"}
                   style={{cursor: 'pointer'}}
                   onClick={handleMyAlbum}>
                <img src={require("./assets/img/album_book.png")}
                     style={globalStickerStyles.sticker}
                />
              </div>
            </Row>
          </Col>
          <Col>
            <Row className="mb-3 m-0 p-0 justify-content-center">
              <Col className="d-flex col-2 justify-content-center">
                <span className="text-white text-center" style={{fontSize: 25}}>Paquete diario</span>
              </Col>
            </Row>
            <Row className="m-0 p-0 justify-content-center">
              <Packet
                  onOpenPacket={onClickDailyPackage}
                  unopenedPacketsQty={(user.has_daily_packages_available ? 2 : 0)}
                  style={{maxWidth: "50%", cursor: "pointer"}}
                  message=""
              />
            </Row>
            {!user.has_daily_packages_available &&
                <Row className="align-items-center justify-content-center mt-3">
                  <Countdown date={getDailyPacketDate()} renderer={({ hours, minutes, seconds, completed }) => {
                    return (
                        <Card className="bg-transparent border-0">
                          <span className="text-black text-center"> Próximos paquetes en... </span>
                          <span className="text-black text-center" style={{fontSize: 25}}>
                              {hours}H  {minutes}M  {seconds}S
                          </span>
                        </Card>
                    );
                  }} />
                </Row>
            }
          </Col>
        </Row>
        <Error modal={errorModal} isOpen={showErrorModal} onAccept={() => setShowErrorModal(false)}/>
        <Success modal={successModal} isOpen={showSuccessModal} onAccept={() => {
          setShowSuccessModal(false);
          handleDailyPacket();
        }}/>
      </Container>
    </React.Fragment>

  );
}

export default App;

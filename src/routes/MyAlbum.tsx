import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {ALBUM_PAGES, DEFAULT_COUNTRY_PAGE} from "../data/albumData";
import AlbumPage from "../components/AlbumPage";
import {ISticker} from "../components/stickers/Sticker";
import {useNavigate, useSearchParams} from "react-router-dom";
import client from "../services/config";
import {useUser} from "../context/UserContext";
import {Container, Row, Col, Fade} from "reactstrap";
import MySpinner from "../components/spinner/MySpinner";

const MyAlbum = () => {
  const NUM_PLAYERS = 11;
  const DESKTOP_SIZE = 1230;
  const user = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY_PAGE);
  const [pasteId, setPasteId] = useState<string | undefined>(undefined);
  const [position, setPosition] = useState<number | undefined>(undefined);
  const [pastedIdAnimation, setPastedIdAnimation] = useState<string | undefined>(undefined);
  const [albumStickers, setAlbumStickers] = useState([] as any[]);

  const [isDesktop, setDesktop] = useState<boolean>(window.innerWidth >= DESKTOP_SIZE);
  const [isLoading, setLoading] = useState(true); //TODO Agregar loader del album

  const QPARAM_COUNTRY = "country"
  const QPARAM_POSITION = "position"

  useEffect(() => {
    const country = searchParams.get(QPARAM_COUNTRY) || undefined;
    const position = searchParams.get(QPARAM_POSITION) || undefined;
    const stickerIdToBePasted = searchParams.get("stickerId") || undefined;

    if (country) {
      setSelectedCountry(country);
    }
    setPasteId(stickerIdToBePasted);
    setPosition(Number(position) || undefined);
    findPastedStickers(country)
  }, [selectedCountry, searchParams])

  const findPastedStickers = async (country?: string, withLoading?:false) => {
    setLoading(true);

    client.get(`/users/${user._id}/stickers?country=${country || DEFAULT_COUNTRY_PAGE}&is_on_album=true`).then((response: any) => {
      let pastedStickers = (response.status === 200 && response.data) ? response.data : [];
      processPageData(pastedStickers);
      setLoading(false);
    });
  }

  const processPageData = (stickersOnAlbum: ISticker[]) => {
    let stickers: object[] = [];
    console.log("process page data");
    console.log(stickersOnAlbum);
    stickersOnAlbum.forEach((sticker: ISticker) => {
      stickers[sticker.number] = sticker;
    });

    for (let i = 0; i <= NUM_PLAYERS; i++) {
      if (!stickers.at(i)) {
        stickers[i] = {id: i.toString(), is_on_album: false}
      }
    }

    console.log("processed stickers... ")
    console.log(stickers)
    setAlbumStickers(stickers);
  }

  const nextPage = () => {
    let _currentPosition = ALBUM_PAGES.findIndex((element) => element === selectedCountry);
    let _selectedCountry = DEFAULT_COUNTRY_PAGE;
    if (_currentPosition >= 0) {
      _selectedCountry = ALBUM_PAGES.at(_currentPosition + 1) || ALBUM_PAGES.at(0) || DEFAULT_COUNTRY_PAGE;
    }
    navigateTo(_selectedCountry);
  }

  const previousPage = () => {
    let _currentPosition = ALBUM_PAGES.findIndex((element) => element === selectedCountry);
    let _selectedCountry = DEFAULT_COUNTRY_PAGE;
    if (_currentPosition >= 0) {
      _selectedCountry = ALBUM_PAGES.at(_currentPosition - 1) || DEFAULT_COUNTRY_PAGE
    }
    navigateTo(_selectedCountry);
  }

  const navigateTo = (country : string) => {
    navigate("/my-album?country=" + country, {replace: true});
  }

  const onPaste = async (stickerId?: string) => {
    if (!pasteId) {
      return;
    }

    const {data: response} = await client.patch(
      `/users/${user._id}/stickers/${stickerId}/paste`
    );

    console.log("API REQUEST TO PASTE " + stickerId)
    console.log("Response")
    console.log(response)

    setPasteId(undefined);
    setPosition(undefined);
    setPastedIdAnimation(stickerId)
    await findPastedStickers(selectedCountry);
  }

  const updateMedia = () => {
    setDesktop(window.innerWidth >= DESKTOP_SIZE)
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  })

  return (
    <React.Fragment>
      <MyNavbar/>
      <Container className={"bg-gradient-orange m-0 p-0" + (isDesktop ? " overflow-hidden h-90vh" : "")} fluid>
        <Row className="mt-4">
          <h1 className="mt-4 ml-9 text-start text-white align-self-center" style={{fontSize: 30, cursor: "default"}}>
            {/*<Button size="lg" className="btn-icon badge-circle badge-lg" outline><ArrowLeftIcon className="text-white" size={40} /></Button>*/}
            MI ALBUM
          </h1>
        </Row>
        <Row className="h-75vh overflow-auto justify-content-center align-items-center">
          {isLoading &&
              <Col className="justify-content-center col-4 align-self-center">
                <MySpinner message={"Cargando Album..."} className="text-white-50"/>
              </Col>
          }
          {!isLoading &&
              <>
                <Col className="col-1 justify-content-end d-flex">
                  <span><i className="ni ni-bold-left text-white text-center"
                           onClick={previousPage}
                           style={{
                             fontSize: 70,
                             cursor: "pointer"
                  }}></i></span>
                </Col>
                <Col className="col-10">
                  <Fade className="justify-content-center d-flex" appear={isLoading} timeout={2000}>
                    <AlbumPage albumStickers={albumStickers}
                               country={selectedCountry}
                               position={position}
                               pasteId={pasteId}
                               onPaste={() => onPaste(pasteId)}
                               pasteIdAnimation={pastedIdAnimation}
                    />
                  </Fade>
                </Col>
                <Col className="col-1 justify-content-start d-flex">
                  <span><i className="ni ni-bold-right text-white text-center"
                           style={{
                             fontSize: 70,
                             cursor: "pointer"
                           }}
                           onClick={nextPage}
                  ></i></span>
                </Col>
              </>
          }
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default MyAlbum

import React, {useEffect, useRef, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {ALBUM_PAGES, DEFAULT_COUNTRY_PAGE} from "../data/albumData";
import AlbumPage from "../components/AlbumPage";
import {IBackEndSticker, IPlayer} from "../components/Sticker";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ISlicedPlayer} from "../components/StickerPlaceHolder";
import client from "../services/config";
import {useUser} from "../context/UserContext";
import {Container, Row, Col, Spinner} from "reactstrap";

// TODO: despues eliminar el IPlayer[] dado que es data mockeada
export type ITeam = {
  players: IPlayer[] | ISlicedPlayer[];
  country: string;
  pageNumber: number
}

const MyAlbum = () => {
  const NUM_PLAYERS = 11;
  const user = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY_PAGE);
  const [pasteId, setPasteId] = useState<string | undefined>(undefined);
  const [position, setPosition] = useState<number | undefined>(undefined);
  const [albumStickers, setAlbumStickers] = useState([] as any[]);

  const [isLoading, setLoading] = useState(true); //TODO Agregar loader del album
  const [isPasting, setIsPasting] = useState(false);

  useEffect(() => {
    // TODO: poner en una constante global este queryParam
    const country = searchParams.get("country") || undefined;
    const position = searchParams.get("position") || undefined;
    const stickerIdToBePasted = searchParams.get("stickerId") || undefined;

    console.log("country: " + country);
    if (country) {
      setSelectedCountry(country);
    }
    setPasteId(stickerIdToBePasted);
    setPosition(Number(position) || undefined);
    findPastedStickers(country)
  }, [selectedCountry, searchParams])

  const findPastedStickers = async (country?: string) => {
    setLoading(true);
    client.get(`/users/${user._id}/stickers?country=${country || DEFAULT_COUNTRY_PAGE}&is_on_album=true`).then((response: any) => {
      let pastedStickers = (response.status === 200 && response.data) ? response.data : [];
      processPageData(pastedStickers);
      setLoading(false);
    });
  }

  const processPageData = (stickersOnAlbum: IBackEndSticker[]) => {
    let stickers: object[] = [];
    console.log("process page data");
    console.log(stickersOnAlbum);
    stickersOnAlbum.forEach((sticker: IBackEndSticker) => {
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

  const validateSelectedPage = () => {
    return albumStickers &&
        albumStickers.length >= NUM_PLAYERS;
  }

  const nextPage = () => {
    let _currentPosition = ALBUM_PAGES.findIndex((element) => element === selectedCountry);
    let _selectedCountry = DEFAULT_COUNTRY_PAGE;
    if (_currentPosition >= 0) {
      _selectedCountry = ALBUM_PAGES.at(_currentPosition + 1) || DEFAULT_COUNTRY_PAGE
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

  const onPaste = async (pasteId?: string) => {
    if (!pasteId) {
      return;
    }

    const {data: response} = await client.patch(
      `/users/${user._id}/stickers/${pasteId}/paste`
    );

    console.log("API REQUEST TO PASTE " + pasteId)
    console.log("Response")
    console.log(response)

    setIsPasting(false);
    setPasteId(undefined);
    setPosition(undefined);
    await findPastedStickers(selectedCountry);
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <Container className="text-center">
        <Row className="h-100 justify-content-center align-items-center">
          {isLoading &&
              <Col className="justify-content-center col-4 align-self-center">
                <Spinner className="text-gray" type="grow" style={{height: '3rem', width: '3rem'}}></Spinner>
              </Col>
          }
          {!isLoading &&
              <Col>
                  <AlbumPage albumStickers={albumStickers}
                             country={selectedCountry}
                             position={position}
                             pasteId={pasteId}
                             onPaste={() => onPaste(pasteId)}/>
                <button className={"btn btn-primary btn-sm m-2"} onClick={previousPage}>Anterior</button>
                <button className={"btn btn-primary btn-sm m-2"} onClick={nextPage}>Siguiente</button>
              </Col>
          }
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default MyAlbum

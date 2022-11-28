import React, {useEffect, useState} from "react";
import {AllStickers, Stickers} from "../components/stickers/Stickers";
import {fetchAllStickers, fetchUserStickers} from "../services/apicalls";
import {Filters} from "./MyStickers";
import {useUser} from "../context/UserContext";
import {ISticker, IStickerData} from "../components/stickers/Sticker";
import MyNavbar from "../components/MyNavbar";
import {useDrop} from "react-dnd";
import {globalButtonsStyle, globalStickerStyles} from "../res/globalStyles";
import {Button, Input} from "reactstrap";
import {StickerStack, StickerStack2} from "../components/stickers/StickerStack";
import {CreateExchangeStrings} from "../res/strings";
import {DraggableTypes} from "../components/Draggable";
import PlayersInfo from "../components/stickers/PlayersInfo";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "./RoutesNames";
import client from "../services/config";
import Success from "../components/modals/Success";
import Error from "../components/modals/Error";
import MySpinner from "../components/spinner/MySpinner";

const CreateExchange = () => {
  const user = useUser()
  const initialFilterState: Filters = {
    name: "",
    country: undefined
  }

  const [form, setForm] = useState<Filters>(initialFilterState);
  const [fetchedStickers, setFetchedStickers] = useState<ISticker[]>([])
  const [allStickers, setAllStickers] = useState<IStickerData[]>([])

  const [isGiving, setIsGiving] = useState(true);
  const [stickersToGive, setStickersToGive] = useState<ISticker[]>([])
  const [stickersToReceive, setStickersToReceive] = useState<IStickerData[]>([])

  const initialModalState = {
    header: "",
    body: "",
  };
  const [modal, setModal] = useState(initialModalState)
  const [showModal, setShowModal] = useState(false)
  const [errorModal, setErrorModal] = useState(initialModalState)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const PICKING_STATE_TITLE = {
    give: "Seleccionando las figuritas a dar",
    receive: "Seleccionando las figuritas a recibir"
  }

  const MAX_STICKERS_PER_EXCHANGE = 5

  useEffect(() => {
    _fetchUserStickers()
  }, [])

  useEffect(() => {
    if (stickersToGive.length > 0) {
      const stickersToGiveCpy = stickersToGive.slice()
      const index = fetchedStickers.findIndex(element => stickersToGiveCpy[stickersToGiveCpy.length - 1].id === element.id)
      if (index > 0) {
        const fetchedStickersCpy = fetchedStickers.slice()
        fetchedStickersCpy[index].quantity = fetchedStickersCpy[index].quantity - 1
        setFetchedStickers(fetchedStickersCpy)
      }
    }
  }, [stickersToGive.length])

  useEffect(() => {
    if (form.name !== undefined) {
      if (form.name.length >= 3 || form.name.length === 0) {
        _fetchUserStickers()
      }
    }
  }, [form.name])

  const _fetchUserStickers = async () => {
    const stickers = await fetchUserStickers(user._id, form)
    setFetchedStickers(stickers)
  }

  const _fetchAllStickers = async () => {
    const stickers = await fetchAllStickers()
    setAllStickers(stickers)
  }

  const handleChange = ({target: {id, value}}: any) => {
    setForm({...form, [id]: value})
  }

  const selectReceive = () => {
    setIsGiving(false)
    _fetchAllStickers()
  }

  const selectGive = () => {
    setIsGiving(true)
  }

  const clean = () => {
    setForm(initialFilterState)
    _fetchUserStickers()
    setStickersToGive([])
    setStickersToReceive([])
    setIsGiving(true)
  }

  function contains(oldStickers: ISticker[], sticker: ISticker) {
    if (oldStickers.length >= MAX_STICKERS_PER_EXCHANGE) {
      return 0
    }
    const result: number = oldStickers.findIndex((element: ISticker) => element.id === sticker.id);
    return result
  }

  function contains2(oldStickers: IStickerData[], sticker: IStickerData) {
    if (oldStickers.length >= MAX_STICKERS_PER_EXCHANGE) {
      return 0
    }
    const result: number = oldStickers.findIndex((element: IStickerData) => element._id === sticker._id);
    return result
  }

  const addStickerToExchangeGive = async (sticker: ISticker) => {
    setStickersToGive(oldStickersToGive => (
      contains(oldStickersToGive, sticker) < 0 ? [...oldStickersToGive, sticker]
        : [...oldStickersToGive]))
  }

  const addStickerToExchangeReceive = async (sticker: IStickerData) => {
    setStickersToReceive(oldStickersToReceive => (
      contains2(oldStickersToReceive, sticker) < 0 ? [...oldStickersToReceive, sticker]
        : [...oldStickersToReceive]))
  }

  const [{isOverGive}, dropExchangeGive] = useDrop(() => ({
    accept: DraggableTypes.STICKER,
    drop: (sticker: ISticker) => addStickerToExchangeGive(sticker),
    collect: (monitor) => ({
      isOverGive: monitor.isOver(),
    })
  }))

  const [{isOverReceive}, dropExchangeReceive] = useDrop(() => ({
    accept: DraggableTypes.STICKER,
    drop: (sticker: IStickerData) => addStickerToExchangeReceive(sticker),
    collect: (monitor) => ({
      isOverReceive: monitor.isOver(),
    })
  }))

  const getStickersId = (stickers: ISticker[]) => {
    const stickersIds: string[] = []
    stickers.forEach(sticker => {
      stickersIds.push(sticker.id)
    })
    return stickersIds
  }

  const getStickersDataId = (stickers: IStickerData[]) => {
    const stickersIds: string[] = []
    stickers.forEach(sticker => {
      stickersIds.push(sticker._id)
    })
    return stickersIds
  }

  const createExchange = async () => {
    const form = {
      sender_id: user._id,
      stickers_to_give: getStickersId(stickersToGive),
      stickers_to_receive: getStickersDataId(stickersToReceive)
    }
    try {
      setIsLoading(true)
      const {data: createdExchange} = await client.post("/exchanges", form)
      setModal({header: CreateExchangeStrings.OK_TITLE, body: CreateExchangeStrings.EXCHANGE_CREATED})
      setShowModal(true)
    } catch (error: any) {
      if (error.response) {
        if (error.response.data?.detail === "Could not create Exchange. stickers_to_receive and stickers_to_give must not have sticker in common") {
          setErrorModal({header: CreateExchangeStrings.ERROR_TITLE, body: CreateExchangeStrings.ERROR_REPEATED})
          setShowErrorModal(true)
        } else if (error.response.data?.detail === "Could not create Exchange. user reached max amount of pending exchanges") {
          setErrorModal({header: CreateExchangeStrings.ERROR_TITLE, body: CreateExchangeStrings.ERROR_MAX_REACHED})
          setShowErrorModal(true)
        } else if (error.response.data?.detail.includes("has not complete his profile")) {
          setErrorModal({
            header: CreateExchangeStrings.ERROR_TITLE,
            body: CreateExchangeStrings.ERROR_PROFILE_NOT_COMPLETED
          })
          setShowErrorModal(true)
        }
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
    setIsLoading(false)
  }

  const closeModal = () => {
    setShowModal(false)
    navigate(`../${ROUTES.MY_EXCHANGES}`)
  }

  const closeErrorModal = () => {
    setShowErrorModal(false)
  }

  const StickersPicker = () => {

    const styles = {
      stickersPickersReceive: {
        backgroundImage: `url("/images/qatar_bg_4.jpeg")`,
      },
    }

    return (
      <div className="container h-65vh bg-translucent-light border rounded"
           style={{...{overflowY: "auto", overflowX: "hidden"}, ...(!isGiving ? styles.stickersPickersReceive : {})}}>
        <div className="row row-cols-md-2 row-cols-lg-5 mt-2">
          {/*Listado de stickers*/}
          {isGiving ?
            <Stickers stickers={fetchedStickers} style={globalStickerStyles.stickerSmall}/>
            : <AllStickers stickers={allStickers} style={globalStickerStyles.stickerSmall}/>
          }
        </div>
      </div>
    )
  }

  const MyExchangeCreator = () => {

    const styles = {
      dropSize: {
        height: '28rem'
      }
    }

    return (
      <div className="container h-65vh bg-translucent-light border rounded mb-1 text-center mt-2">
        <div className="row mt-2">
          <div className="col">
            <div ref={isGiving ? dropExchangeGive : undefined} className="card"
                 style={{...styles.dropSize, ...globalButtonsStyle.alternative}}>
              <div className="card-body">
                <div className="d-flex flex-column align-items-center">
                  <h1 className="text-white">Voy a dar</h1>
                  {isGiving && <div className="text-center" style={globalButtonsStyle.alternative}>
                    <p className="text-white">{CreateExchangeStrings.EXCHANGE_GIVE_HINT}</p>
                  </div>}
                  <StickerStack stickers={stickersToGive} isCreating={true}/>
                  <hr className="my-1"/>
                  <PlayersInfo stickers={stickersToGive}/>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div ref={!isGiving ? dropExchangeReceive : undefined} className="card"
                 style={{...styles.dropSize, ...globalButtonsStyle.alternative}}>
              <div className="card-body">
                <div className="d-flex flex-column align-items-center">
                  <h1 className="text-white">Voy a recibir</h1>
                  {!isGiving && <div className="text-center">
                    <p className="text-white">{CreateExchangeStrings.EXCHANGE_GIVE_HINT}</p>
                  </div>}
                  <StickerStack2 stickers={stickersToReceive} isCreating={true}/>
                  <hr className="my-1"/>
                  <PlayersInfo stickers={stickersToReceive}/>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="row justify-content-md-center">
          {stickersToGive.length > 0 && stickersToReceive.length > 0 &&
            <h1 className="text-green m-0">{CreateExchangeStrings.EXCHANGE_READY}</h1>}
          {stickersToGive.length > 0 && stickersToReceive.length > 0 &&
            <Button className="btn-success w-50" onClick={createExchange}>
              Confirmar
            </Button>}
        </div>

      </div>
    )
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="container-fluid bg-qatar-img h-90vh overflow-auto">
        {isLoading &&
          <div className="d-flex justify-content-center align-items-center h-100vh">
            <MySpinner className="text-white-50" message={"Creando intercambio..."}/>
          </div>
        }
        {!isLoading && <div className="row">
          <h1 className="mt-4 text-center text-white align-self-center" style={{fontSize: 30}}>Creando Intercambio</h1>
          <h1
            className="mt-4 text-center text-white align-self-center">{isGiving ? PICKING_STATE_TITLE.give : PICKING_STATE_TITLE.receive}</h1>
          {/*Selector de figuritas*/}
          <div className="col">
            <div className="row mb-2">
              <form>
                <Input placeholder="Buscar" className="text-white bg-translucent-dark " type="text" id="name"
                       onChange={handleChange}
                       value={form.name}/>
              </form>
            </div>
            <div className="row">
              <StickersPicker/>
            </div>
          </div>
          {/*Intercambio*/}
          <div className="col">
            <div className="container text-center">
              <div className="row">
                <div className="col-6">
                  <Button onClick={isGiving ? selectReceive : selectGive}
                          style={globalButtonsStyle.alternative} className="text-white" block>
                    {isGiving ? "A recibir" : "A dar"}</Button>
                </div>
                <div className="col-6">
                  <Button onClick={clean} className="btn-secondary" block>Limpiar</Button>
                </div>
              </div>
            </div>
            <MyExchangeCreator/>
          </div>
        </div>}
      </div>
      <Success modal={modal} isOpen={showModal} onAccept={closeModal}/>
      <Error modal={errorModal} isOpen={showErrorModal} onAccept={closeErrorModal}/>
    </React.Fragment>

  )
}

export default CreateExchange

import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {Stickers, AllStickers} from "../components/stickers/Stickers";
import {fetchAllStickers, fetchUserStickers} from "../services/apicalls";
import {Filters} from "./MyStickers";
import {useUser} from "../context/UserContext";
import {ISticker, IStickerData} from "../components/Sticker";
import MyNavbar from "../components/MyNavbar";
import {useDrop} from "react-dnd";
import {globalButtonsStyle, globalStickerStyles} from "../res/globalStyles";
import {isSearchValid} from "../services/validator";
import {Button, Form, FormGroup, Input, InputGroup, InputGroupText} from "reactstrap";
import {StickerStack, StickerStack2} from "../components/stickers/StickerStack";
import {CreateExchangeStrings} from "../res/strings";
import {DraggableTypes} from "../components/Draggable";
import {useForm} from "react-hook-form";
import PlayersInfo from "../components/stickers/PlayersInfo";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "./RoutesNames";
import client from "../services/config";
import Success from "../components/modals/Success";
import Error from "../components/modals/Error";

const CreateExchange = () => {
  const user = useUser()
  const initialFilterState: Filters = {
    name: undefined,
    country: undefined
  }
  const _searchFilters = useRef<Filters>(initialFilterState);
  const [fetchedStickers, setFetchedStickers] = useState<ISticker[]>([])
  const [allStickers, setAllStickers] = useState<IStickerData[]>([])

  const [isGiving, setIsGiving] = useState(true);
  const _isGiving = useRef(true);
  const [stickersToGive, setStickersToGive] = useState<ISticker[]>([])
  const [stickersToReceive, setStickersToReceive] = useState<IStickerData[]>([])

  const [isReadyToCreate, setIsReadyToCreate] = useState(false)

  const initialModalState = {
    header: "",
    body: "",
  };
  const [modal, setModal] = useState(initialModalState)
  const [showModal, setShowModal] = useState(false)
  const [errorModal, setErrorModal] = useState(initialModalState)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const navigate = useNavigate();
  const {register} = useForm();

  const PICKING_STATE_TITLE = {
    give: "Seleccionando las figuritas a dar",
    receive: "Seleccionando las figuritas a recibir"
  }

  const MAX_STICKERS_PER_EXCHANGE = 5

  useEffect(() => {
    _fetchUserStickers()
  }, [])

  useEffect(() => {
    if(stickersToGive.length > 0){
      const stickersToGiveCpy = stickersToGive.slice()
      const index = fetchedStickers.findIndex(element => stickersToGiveCpy[stickersToGiveCpy.length-1].id === element.id)
      if(index > 0){
        const fetchedStickersCpy = fetchedStickers.slice()
        fetchedStickersCpy[index].quantity = fetchedStickersCpy[index].quantity - 1
        setFetchedStickers(fetchedStickersCpy)
      }
    }
  }, [stickersToGive.length])

  useEffect(() => {
    if(stickersToGive.length > 0 && stickersToReceive.length > 0){
      setIsReadyToCreate(true)
    }
  }, [stickersToGive.length, stickersToReceive.length])

  const _fetchUserStickers = async () => {
    const stickers = await fetchUserStickers(user._id, _searchFilters.current)
    setFetchedStickers(stickers)
  }

  const _fetchAllStickers = async () => {
    const stickers = await fetchAllStickers()
    setAllStickers(stickers)
  }

  const onChangeHandler = ({target: {id, value}}: any) => {
    // @ts-ignore
    _searchFilters.current[id] = value;
    _fetchUserStickers();
  }

  const handleChange = () => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      if (isSearchValid(e.target.value)) onChangeHandler(e)
    };
  }

  const selectReceive = () => {
    setIsGiving(false)
    _isGiving.current = false
    _fetchAllStickers()
  }

  const selectGive = () => {
    setIsGiving(true)
    _isGiving.current = true
  }

  const clean = () => {
    _fetchUserStickers()
    setStickersToGive([])
    setStickersToReceive([])
    setIsGiving(true)
    _isGiving.current = true
  }

  function contains(oldStickers: ISticker[], sticker: ISticker) {
    if(oldStickers.length >= MAX_STICKERS_PER_EXCHANGE){
      return 0
    }
    const result: number = oldStickers.findIndex((element: ISticker) => element.id === sticker.id);
    return result
  }

  function contains2(oldStickers: IStickerData[], sticker:  IStickerData) {
    if(oldStickers.length >= MAX_STICKERS_PER_EXCHANGE){
      return 0
    }
    const result: number = oldStickers.findIndex((element: IStickerData) => element._id === sticker._id);
    return result
  }

  const addStickerToExchangeGive = async (sticker: ISticker) => {
    if(_isGiving.current){
      console.log("add sticker to give")
      setStickersToGive(oldStickersToGive => (
        contains(oldStickersToGive, sticker) < 0 ? [...oldStickersToGive, sticker]
          : [...oldStickersToGive]
      ));
    }

  }

  const addStickerToExchangeReceive = async (sticker: IStickerData) => {
    if(!_isGiving.current) {
      console.log("add sticker to receive")
      setStickersToReceive(oldStickersToReceive => (
          contains2(oldStickersToReceive, sticker) < 0 ? [...oldStickersToReceive, sticker]
          : [...oldStickersToReceive]
      ));
    }
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
      const {data: createdExchange} = await client.post("/exchanges", form)
      setModal({header:CreateExchangeStrings.OK_TITLE, body: CreateExchangeStrings.EXCHANGE_CREATED})
      setShowModal(true)
    } catch (error: any) {
      if (error.response) {
        if(error.response.data?.detail === "Could not create Exchange. stickers_to_receive and stickers_to_give must not have sticker in common"){
          setErrorModal({header:CreateExchangeStrings.ERROR_TITLE, body: CreateExchangeStrings.ERROR_REPEATED})
          setShowErrorModal(true)
        } else if (error.response.data?.detail === "Could not create Exchange. user reached max amount of pending exchanges") {
          setErrorModal({header:CreateExchangeStrings.ERROR_TITLE, body: CreateExchangeStrings.ERROR_MAX_REACHED})
          setShowErrorModal(true)
        }
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
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
      stickersPickers:{
        backgroundImage: `url("/images/bg_stickers.jpeg")`
      },
      stickersPickersReceive:{
        backgroundImage: `url("/images/qatar_bg_4.jpeg")`
      }
    }

    const SearchBar = () => {
      return (
        <Form className="navbar-search">
          <FormGroup className="mb-0">
            <InputGroup className="input-group-alternative">
              <InputGroupText>
                <i className="fas fa-search"/>
              </InputGroupText>
              <Input placeholder="Buscar" type="text" id="name" {...register("name", {
                onChange: handleChange()
              })} />
            </InputGroup>
          </FormGroup>
        </Form>
      );
    }

    return (
      <div className="card p-1" style={isGiving ? styles.stickersPickers : styles.stickersPickersReceive}>
        <div className="card-body">
        <div className="row">
          <h1 className="text-white">{isGiving ? PICKING_STATE_TITLE.give : PICKING_STATE_TITLE.receive}</h1>


        </div>
        {/*Buscador y botones*/}
        <div className="row">
          <div className="d-flex flex-row">
            <SearchBar/>
            {isGiving ? <Button onClick={selectReceive}>A recibir</Button> :
              <Button onClick={selectGive}>A dar</Button>
            }
            <Button onClick={clean}>Limpiar</Button>
          </div>
        </div>
        <div className="row row-cols-3">
          {/*Listado de stickers*/}
          {isGiving ?
            <Stickers stickers={fetchedStickers} style={globalStickerStyles.stickerSmall}/>
            : <AllStickers stickers={allStickers} style={globalStickerStyles.stickerSmall}/>
          }
        </div>
      </div></div>
    )
  }

  const MyExchangeCreator = () => {

    const styles = {
      exchangeCreation:{
        backgroundImage: `url("/images/bg_exchange.jpg")`
      },
      dropSize:{
        height: '28rem'
      }
    }

    return (
      <div className="card" style={styles.exchangeCreation}>
        <div className="card-body text-center">
          <div className="row">
            <div className="col">
              <div ref={dropExchangeGive} className="card" style={{...styles.dropSize, ...globalButtonsStyle.alternative}}>
                <div className="card-body">
                  <div  className="d-flex flex-column align-items-center">
                    <h1 className="text-white">Voy a dar</h1>
                    {isGiving && <div className="text-center" style={globalButtonsStyle.alternative}>
                        <p className="text-white">{CreateExchangeStrings.EXCHANGE_GIVE_HINT}</p>
                    </div>}
                    <StickerStack stickers={stickersToGive} isCreating={true}/>
                    <PlayersInfo stickers={stickersToGive}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div ref={dropExchangeReceive} className="card" style={{...styles.dropSize, ...globalButtonsStyle.alternative}}>
                <div className="card-body">
                  <div  className="d-flex flex-column align-items-center">
                    <h1 className="text-white">Voy a recibir</h1>
                    {!isGiving && <div className="text-center">
                        <p className="text-white">{CreateExchangeStrings.EXCHANGE_GIVE_HINT}</p>
                    </div>}
                    <StickerStack2 stickers={stickersToReceive} isCreating={true}/>
                    <PlayersInfo stickers={stickersToReceive}/>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="row justify-content-md-center">
            {stickersToGive.length > 0 && stickersToReceive.length > 0 &&
                <h1 className="text-green m-0">{CreateExchangeStrings.EXCHANGE_READY}</h1>}
            {stickersToGive.length > 0 && stickersToReceive.length > 0 && <Button className="btn-success w-50" onClick={createExchange}>
                Confirmar
            </Button>}
            </div>

        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="container-fluid">
        <div className="row">
          <h1>Creando Intercambio</h1>
          {/*Selector de figuritas*/}
          <div className="col">
            <StickersPicker/>
           </div>
          {/*Intercambio*/}
          <div className="col">
            <MyExchangeCreator/>
          </div>
        </div>
      </div>
      <Success modal={modal} isOpen={showModal} onAccept={closeModal}/>
      <Error modal={errorModal} isOpen={showErrorModal} onAccept={closeErrorModal}/>
    </React.Fragment>

  )
}

export default CreateExchange

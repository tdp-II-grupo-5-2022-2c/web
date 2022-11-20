import React, {useEffect, useState} from "react";
import Exchange, {IExchange} from "./Exchange";
import {useUser} from "../context/UserContext";
import {ExchangeStrings} from "../res/strings";
import client from "../services/config";
import {fetchCommunityExchanges} from "../services/apicalls";
import Success from "./modals/Success";
import Error from "./modals/Error";
import {IStickerData} from "./stickers/Sticker";
import MySpinner from "./spinner/MySpinner";

type Props = {
  communityId: string
}

const CommunityExchanges = ({communityId}:Props) => {
  const user = useUser()
  const [communityExchanges, setCommunityExchanges] = useState<IExchange[]>([])

  const initialModalState = {
    header: "",
    body: "",
  };
  const [modal, setModal] = useState(initialModalState)
  const [modalError, setModalError] = useState(initialModalState)
  const [showModal, setShowModal] = useState(false)
  const [showModalError, setShowModalError] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState("")

  useEffect(() => {
    _fetchCommunityExchanges()
  }, [])

  const _fetchCommunityExchanges = async () => {
    setLoadingMsg("Obteniendo intercambios...")
    setIsLoading(true)
    const exchanges = await fetchCommunityExchanges(user._id, communityId)
    setCommunityExchanges(exchanges)
    setIsLoading(false)
  }

  const acceptExchange = async (exchangeId: string) => {
    const success = await doRequest("accept", exchangeId)
    if (success) {
      setModal({header: ExchangeStrings.EXCHANGE_HEADER, body: ExchangeStrings.EXCHANGE_ACCEPT_OK})
      setShowModal(true)
    }
  }

  const rejectExchange = async (exchangeId: string) => {
    await doRequest("reject", exchangeId)
    _fetchCommunityExchanges()
  }

  const closeModal = () => {
    // Fetcheo de nuevo para actualizar y que NO se vea mas el intercambio rechazado o aceptado
    setShowModal(false)
    _fetchCommunityExchanges()
  }

  const closeModalError = () => {
    // Fetcheo de nuevo para actualizar y que NO se vea mas el intercambio rechazado o aceptado
    setShowModalError(false)
    _fetchCommunityExchanges()
  }

  const doRequest = async (action: string, exchangeId: string): Promise<boolean> => {
    const form = {
      action: action,
      receiver_id: user._id
    }
    try {
      setLoadingMsg("Procesando...")
      setIsLoading(true)
      const {data: response} = await client.post(`/exchanges/${exchangeId}`, form)
      return true

    } catch (error: any) {
      if (error.response) {
        // TODO: agregar error para el caso de que el intercambio ya no exista (para cubrir el caso comun de que le acepto alguien antes)
        if (error.response.data?.detail.includes("has not complete his profile")) {
          setModalError({header:ExchangeStrings.PROFILE_NOT_COMPLETED_TITLE, body: ExchangeStrings.ERROR_ACCEPT_REJECT_PROFILE_NOT_COMPLETED})
          setShowModalError(true)
        } else if (error.response.data?.detail.includes("is completed, you cannot apply any action")){
          if(action === "accept"){
            setModalError({header:ExchangeStrings.EXCHANGE_HEADER, body: ExchangeStrings.EXCHANGE_TAKEN})
            setShowModalError(true)
          }
        } else {
          if(action === "accept"){
            setModalError({header: ExchangeStrings.EXCHANGE_HEADER, body: ExchangeStrings.EXCHANGE_ACCEPT_ERROR})
          } else {
            setModalError({header: ExchangeStrings.EXCHANGE_HEADER, body: ExchangeStrings.EXCHANGE_REJECT_ERROR})
          }
          setShowModalError(true)
        }
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
    setIsLoading(false)
    return false
  }

  const swapLastToFirst = (oldExchanges: IExchange[], index: number, isReceive: boolean) => {
    const oldExchangesCpy = oldExchanges.slice()
    // obtengo exchange del array
    const exchange = oldExchangesCpy[index]
    // obtengo stickers
    let stickersCpy: IStickerData[] = []
    if (isReceive) {
      stickersCpy = exchange.stickers_to_receive
    } else {
      stickersCpy = exchange.stickers_to_give
    }
    // saco el ultimo
    const last = stickersCpy.pop()
    if (last) {
      // lo pongo al principio
      stickersCpy.unshift(last)
    }
    if (isReceive) {
      // seteo los cambios en el exchange
      exchange.stickers_to_receive = stickersCpy
    } else {
      exchange.stickers_to_give = stickersCpy
    }
    // seteo el exchange en el array de exchanges
    oldExchangesCpy[index] = exchange
    return oldExchangesCpy
  }

  const swapReceive = (index: number) => {
    setCommunityExchanges(oldExchanges => swapLastToFirst(oldExchanges, index, true))
  }

  const swapGive = (index: number) => {
    setCommunityExchanges(oldExchanges => swapLastToFirst(oldExchanges, index, false))
  }

  return (
    <React.Fragment>
      {isLoading && <div className="d-flex justify-content-center align-items-center h-65vh">
        <MySpinner message={loadingMsg}/>
      </div>}
      {!isLoading && <div className="container">
        <div className="row">
          {communityExchanges.map((exchange, index) =>
            <div key={exchange._id} className="d-flex justify-content-center mb-1">
                <Exchange exchange={exchange} isOwner={false} onAccept={acceptExchange} onReject={rejectExchange}
                          onClickGive={() => swapGive(index)} onClickReceive={() => swapReceive(index)}/>
            </div>
          )}
        </div>
      </div>}
      <Success modal={modal} isOpen={showModal} onAccept={closeModal}/>
      <Error modal={modalError} isOpen={showModalError} onAccept={closeModalError}/>
    </React.Fragment>
  )
}

export default CommunityExchanges

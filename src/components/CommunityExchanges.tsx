import React, {useEffect, useState} from "react";
import Exchange, {IExchange} from "./Exchange";
import {useUser} from "../context/UserContext";
import {ExchangeStrings} from "../res/strings";
import client from "../services/config";
import {fetchCommunityExchanges} from "../services/apicalls";
import Success from "./modals/Success";
import Error from "./modals/Error";
import {IStickerData} from "./Sticker";

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

  useEffect(() => {
    _fetchCommunityExchanges()
  }, [])

  const _fetchCommunityExchanges = async () => {
    const exchanges = await fetchCommunityExchanges(user._id, communityId)
    setCommunityExchanges(exchanges)
  }

  const acceptExchange = async (exchangeId: string) => {
    const success = await doRequest("accept", exchangeId)
    if (success) {
      setModal({header: ExchangeStrings.EXCHANGE_HEADER, body: ExchangeStrings.EXCHANGE_ACCEPT_OK})
      setShowModal(true)
    } else {
      setModalError({header: ExchangeStrings.EXCHANGE_HEADER, body: ExchangeStrings.EXCHANGE_ACCEPT_ERROR})
      setShowModalError(true)
    }
  }

  const rejectExchange = async (exchangeId: string) => {
    const success = await doRequest("reject", exchangeId)
    if (!success) {
      setModalError({header: ExchangeStrings.EXCHANGE_HEADER, body: ExchangeStrings.EXCHANGE_REJECT_ERROR})
      setShowModalError(true)
    } else {
      _fetchCommunityExchanges()
    }
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
      const {data: response} = await client.post(`/exchanges/${exchangeId}`, form)
      return true

    } catch (error: any) {
      if (error.response) {
        if (error.response.data?.detail === "TODO: detalle error back") {

        }
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }

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
      <div className="container">
        <div className="row">
          {communityExchanges.map((exchange, index) =>
            <div key={exchange._id} className="d-flex justify-content-center mb-1">
                <Exchange exchange={exchange} isOwner={false} onAccept={acceptExchange} onReject={rejectExchange}
                          onClickGive={() => swapGive(index)} onClickReceive={() => swapReceive(index)}/>
            </div>
          )}
        </div>
      </div>
      <Success modal={modal} isOpen={showModal} onAccept={closeModal}/>
      <Error modal={modalError} isOpen={showModalError} onAccept={closeModalError}/>
    </React.Fragment>
  )
}

export default CommunityExchanges

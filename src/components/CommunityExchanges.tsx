import React, {useEffect, useState} from "react";
import Exchange, {IExchange} from "./Exchange";
import {useUser} from "../context/UserContext";
import {MyModal2} from "./MyModal";
import {ExchangeStrings} from "../res/strings";
import client from "../services/config";
import {fetchCommunityExchanges} from "../services/apicalls";
import Success from "./modals/Success";
import Error from "./modals/Error";

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

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          {communityExchanges.map((exchange, index) =>
            <div key={exchange._id} className="col d-flex justify-content-center">
              <div>
                <Exchange exchange={exchange} isOwner={false} onAccept={acceptExchange} onReject={rejectExchange}/>
              </div>
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

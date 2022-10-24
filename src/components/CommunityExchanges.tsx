import React, {useEffect, useState} from "react";
import Exchange, {IExchange} from "./Exchange";
import {useUser} from "../context/UserContext";
import {getMockedExchanges} from "../data/exchangesData";
import {MyModal2} from "./MyModal";
import {ExchangeStrings} from "../res/strings";
import client from "../services/config";
import {fetchCommunityExchanges} from "../services/apicalls";

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
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    _fetchCommunityExchanges()
  }, [])

  const _fetchCommunityExchanges = async () => {
    const exchanges = await fetchCommunityExchanges(user._id, communityId)
    setCommunityExchanges(exchanges)
  }

  const acceptExchange = async (exchangeId: string) => {
    console.log("Exchange accepted! id " + exchangeId)
    const success = await doRequest("accept")
    if (success) {
      setModal({header: "", body: ExchangeStrings.EXCHANGE_ACCEPT_OK})
    } else {
      setModal({header: "", body: ExchangeStrings.EXCHANGE_ACCEPT_ERROR})
    }
    setShowModal(true)
  }

  const rejectExchange = async (exchangeId: string) => {
    console.log("Exchange rejected! id " + exchangeId)
    const success = await doRequest("accept")
    if (!success) {
      setModal({header: "", body: ExchangeStrings.EXCHANGE_REJECT_ERROR})
    }
    setShowModal(true)
  }

  const closeModal = () => {
    // Fetcheo de nuevo para actualizar y que NO se vea mas el intercambio rechazado o aceptado
    setShowModal(false)
    _fetchCommunityExchanges()
  }

  const doRequest = async (action: string): Promise<boolean> => {
    const form = {
      action: action,
      sender_id: user._id
    }
    try {
      const {data: response} = await client.post("/exchanges", form)
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
            <div className="col d-flex justify-content-center">
              <div key={exchange._id}>
                <Exchange exchange={exchange} isOwner={false} onAccept={acceptExchange} onReject={rejectExchange}/>
              </div>
            </div>
          )}
        </div>
      </div>
      <MyModal2 modal={modal} isOpen={showModal} onAccept={closeModal}/>
    </React.Fragment>
  )
}

export default CommunityExchanges

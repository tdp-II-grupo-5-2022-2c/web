import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import client from "../services/config";
import MyNavbar from "../components/MyNavbar";
import {Button, Col, Container, Row} from "reactstrap";
import ChatRoom from "../components/chat/ChatRoom";
import {useUser} from "../context/UserContext";
import {useErrorHandler} from "../context/ErrorHandler";
import UsersList from "../components/communities/UsersList";
import {MyModal} from "../components/MyModal";
import CommunityInviteLink from "../components/communities/CommunityInviteLink";
import CommunityExchanges from "../components/CommunityExchanges";
import {MAX_COMMUNITY_DESCR_LEN} from "../res/constants";
import {updateCommunity} from "../services/apicalls";

export type CommunityInfo = {
  _id: string,
  name: string,
  owner: number,
  description: string,
  users: any[],
  password: string,
  is_blocked: boolean
}

function Community() {
  const {community_id} = useParams();
  const {setErrorResponse} = useErrorHandler();
  const user = useUser();

  const initCommunity: CommunityInfo = {
      _id: "",
      name: "",
      owner: 0,
      description: "",
      users: [],
      password: "",
      is_blocked: false
  }
  const [community, setCommunity] = useState<CommunityInfo>(initCommunity);
  const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false);

  const initialFormState = {
    description: ""
  };
  const [form, setForm] = useState(initialFormState)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchCommunity();
  }, [community_id])

  const fetchCommunity = async () => {
    try {
      const response = await client.get(`/communities/${community_id}`, {
        headers: {
          'x-user-id': user._id
        }
      });
      response.data._id = response.data.id //hack: ahora el back trae id... again...
      const _community = response.data
      setCommunity(_community);
      setForm({description: community.description})
    } catch (error: any) {
      console.log(error.response || error.request || error.message);
      setErrorResponse({
        statusCode: error.response?.status || 500,
        message: "¡Ups! Hubo un problema obteniendo esta comunidad"
      });
    }
  }

  const toggleInvite = () => {
    setInviteModalOpen(!inviteModalOpen);
  }

  const handleChange = ({target: {name, value}}: any) => {
    if (name === "description" && value.length > MAX_COMMUNITY_DESCR_LEN) {
      return
    }
    setForm({...form, [name]: value});
  }

  const enableEdit = () => {
    setIsEditing(true)
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setForm({description: community.description})
  }

  const _updateCommunity = async () => {
    if(community){
      const updatedCommunity = await updateCommunity(community._id, user._id, {description: form.description})
      if(updatedCommunity){
        setCommunity(prevState => ({...prevState, "description": updatedCommunity.description}))
      }
    }
    setIsEditing(false)
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <Container fluid>
        {community &&
          <>
            <Row className="mb-2 mt-3">
              <h1>{community.name}</h1>
            </Row>
            <Row className="mb-2">
              <h2><i className="ni ni-collection text-gray"></i> Descripción</h2>
              <div className="d-flex flex-row">
                <textarea
                  placeholder=""
                  name='description'
                  className="form-control-alternative form-control w-50"
                  onChange={handleChange}
                  value={form.description}
                  disabled={!isEditing}/>
                {community.owner === user._id && !isEditing &&
                  <Button className="ml-3" color="success" onClick={enableEdit}>Editar</Button>}
                {community.owner === user._id && isEditing &&
                  <Button className="ml-3" color="success" onClick={_updateCommunity}>Guardar</Button>}
                {community.owner === user._id && isEditing &&
                  <Button className="ml-3 btn btn-primary" onClick={cancelEdit}>Cancelar</Button>}
                {community.owner === user._id && !isEditing &&
                  <Button className="ml-3" color="success" onClick={toggleInvite}>Invitar</Button>}
              </div>
            </Row>
            <Row className="h-100vh">
              <Col className="col-md-5 col-sm-12">
                <h2><i className="ni ni-world-2 text-gray"></i> Intercambios</h2>
                <div className="users-container">
                  {community_id && <CommunityExchanges communityId={community_id}/>}
                </div>
              </Col>
              <Col className="col-md-5 col-sm-12 vh-100">
                <h2><i className="ni ni-chat-round text-gray"></i> Chat</h2>
                <ChatRoom roomId={community_id}/>
              </Col>
              <Col className="col-md-2 col-sm-12">
                <h2><i className="ni ni-circle-08 text-gray"></i> Miembros</h2>
                <div className="users-container">
                  <UsersList users={community.users}/>
                </div>
              </Col>
            </Row>
            <MyModal header="Invitar un miembro a la comunidad"
                     body={<CommunityInviteLink community={community}/>}
                     isOpen={inviteModalOpen}
                     onAccept={toggleInvite}
                     size="lg"
            />
          </>
        }
      </Container>
    </React.Fragment>
  )
}

export default Community;

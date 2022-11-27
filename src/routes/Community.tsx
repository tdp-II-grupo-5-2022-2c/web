import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import client from "../services/config";
import MyNavbar from "../components/MyNavbar";
import {Button, Card, Col, Container, Input, Row, UncontrolledTooltip} from "reactstrap";
import ChatRoom from "../components/chat/ChatRoom";
import {useUser} from "../context/UserContext";
import {useErrorHandler} from "../context/ErrorHandler";
import UsersList from "../components/communities/UsersList";
import {MyModal} from "../components/MyModal";
import CommunityInviteLink from "../components/communities/CommunityInviteLink";
import CommunityExchanges from "../components/CommunityExchanges";
import {MAX_COMMUNITY_DESCR_LEN} from "../res/constants";
import {updateCommunity} from "../services/apicalls";
import MySpinner from "../components/spinner/MySpinner";
import {CheckCircleFillIcon, CheckIcon, PencilIcon, XCircleFillIcon, XIcon} from "@primer/octicons-react";

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

  const [loading, setLoading] = useState<boolean>(true);
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
    setLoading(true);
    try {
      const response = await client.get(`/communities/${community_id}`, {
        headers: {
          'x-user-id': user._id
        }
      });
      response.data._id = response.data.id //hack: ahora el back trae id... again...
      const _community = response.data
      setCommunity(_community);
      setForm(prevForm => ({...prevForm, description: _community.description}))
    } catch (error: any) {
      console.log(error.response || error.request || error.message);
      setErrorResponse({
        statusCode: error.response?.status || 500,
        message: "¡Ups! Hubo un problema obteniendo esta comunidad"
      });
    }
    setLoading(false);
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
        setCommunity(prevState => ({...prevState, description: updatedCommunity.description}))
      }
    }
    setIsEditing(false)
  }

  useEffect(() => {
    fetchCommunity();
  }, [community_id])

  return (
      <React.Fragment>
        <MyNavbar/>
        <Container fluid className="h-90vh bg-gradient-orange overflow-auto">
          {loading &&
              <Row className="justify-content-center align-items-center h-75vh">
                <Col>
                  <MySpinner className="text-white" message={"Obteniendo Comunidad..."}/>
                </Col>
              </Row>
          }
          {!loading && community.is_blocked &&
              <>
                <Row>
                  <h1 className="mt-4 text-white">{community.name}</h1>
                </Row>
                <Row className="justify-content-center align-items-center h-70vh">
                  <Col className="col-md-5 col-sm-12">
                    <Card className="bg-translucent-dark">
                      <Row>
                        <h1 className="mt-5 text-center text-danger" style={{fontSize: 50}}>
                          Comunidad Bloqueada
                        </h1>
                      </Row>
                      <Row>
                        <h4 className="mb-5 text-center text-white">
                          Esta comunidad ha sido bloqueada. Contáctate con el administrador.
                        </h4>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </>
          }
          {!loading && !community.is_blocked &&
              <>
                <Row className="mb-2 mt-4 align-items-center">
                  <Col className="col-md-5 col-sm-12">
                    <h1 className="text-white">{community.name}
                      <Button className="ml-3" color="secondary" onClick={toggleInvite}>Invitar</Button>
                    </h1>
                  </Col>
                  <Col className="col-md-7 col-sm-12">
                    <div className="d-flex flex-row">
                      <h4 className="text-white">Descripción</h4>
                      {community.owner === user._id && !isEditing &&
                          <>
                            <span className="ml-2" id="edit" onClick={enableEdit} style={{cursor: "pointer"}}>
                              <PencilIcon size={16} verticalAlign="top" className="text-white" />
                            </span>
                            <UncontrolledTooltip target="edit">Editar</UncontrolledTooltip>
                          </>
                      }
                      {community.owner === user._id && isEditing &&
                          <>
                            <span className="ml-2" id="save" onClick={_updateCommunity} style={{cursor: "pointer"}}>
                              <i className="ni ni-check-bold text-success" style={{fontSize: 20}}/>
                            </span>
                            <UncontrolledTooltip target="save">Guardar</UncontrolledTooltip>
                          </>
                      }
                      {community.owner === user._id && isEditing &&
                          <>
                            <span className="ml-1" id="cancel" onClick={cancelEdit} style={{cursor: 'pointer'}}>
                              <i className="ni ni-fat-remove text-dark" style={{fontSize: 22}}/>
                            </span>
                            <UncontrolledTooltip target="cancel">Cancelar</UncontrolledTooltip>
                          </>
                      }
                    </div>
                    <div className="d-flex flex-row">
                      <Input
                          placeholder=""
                          name='description'
                          className={`form-control-alternative form-control ${isEditing ? 'bg-translucent-light text-dark' : 'bg-translucent-secondary text-muted'}`}
                          onChange={handleChange}
                          value={form.description}
                          disabled={!isEditing}/>
                    </div>
                  </Col>
                </Row>
                <Row className="mb-2">

                </Row>
                <Row>
                  <Col className="col-md-5 col-sm-12 h-70vh">
                    <h2 className="text-white"><i className="ni ni-world-2"></i> Intercambios</h2>
                    <div className="users-container">
                      {community_id && <CommunityExchanges communityId={community_id}/>}
                    </div>
                  </Col>
                  <Col className="col-md-5 col-sm-12 h-70vh">
                    <h2 className="text-white"><i className="ni ni-chat-round"></i> Chat</h2>
                    <ChatRoom roomId={community_id}/>
                  </Col>
                  <Col className="col-md-2 col-sm-12 h-70vh">
                    <h2 className="text-white"> <i className="ni ni-circle-08"></i> Miembros</h2>
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

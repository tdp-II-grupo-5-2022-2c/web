import React from "react";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import client from "../services/config";
import MyNavbar from "../components/MyNavbar";
import {Button, Col, Container, Row} from "reactstrap";
import ChatRoom from "../components/chat/ChatRoom";
import {useUser} from "../context/UserContext";
import { useErrorHandler } from "../context/ErrorHandler";
import UsersList from "../components/communities/UsersList";
import {MyModal} from "../components/MyModal";
import CommunityInviteLink from "../components/communities/CommunityInviteLink";

export type CommunityInfo = {
  "_id": number,
  "name": string,
  "owner": number,
  "users": any[],
  "password": string
}

function Community() {
  const { community_id } = useParams();
  const user = useUser();
  const { setErrorResponse } = useErrorHandler();

  const [community, setCommunity] = useState<CommunityInfo|undefined>(undefined);
  const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false);

  const fetchCommunity = async () => {
    if (!community_id) {
      return;
    }

    let _community: CommunityInfo | undefined = undefined;
    try {
      const response = await client.get(`/communities/${community_id}`, {
        headers: {
          'x-user-id': user._id
        }
      });
      _community = response.data

      //TODO: Sacar esto, es temporal mientras estan los users en back
      if (_community) {
        _community.users = [
          {
            user_id: 1,
            name: 'Daniela Carrero'
          },
          {
            user_id: 2,
            name: 'Agustín Leguizamon Albaricoque'
          },
          {
            user_id: 3,
            name: 'Agustín Leguizamon'
          },
          {
            user_id: 4,
            name: 'Agustín Leguizamon'
          },
          {
            user_id: 5,
            name: 'Agustín Leguizamon'
          },
          {
            user_id: 6,
            name: 'Agustín Leguizamon'
          },
          {
            user_id: 7,
            name: 'Agustín Leguizamon'
          },
          {
            user_id: 8,
            name: 'Agustín Leguizamon'
          },
          {
            user_id: 9,
            name: 'Agustín Leguizamon'
          },
          {
            user_id: 10,
            name: 'Agustín Leguizamon'
          }
        ]
      }
    } catch (error: any) {
      console.log(error.response || error.request || error.message);
      setErrorResponse({
        statusCode: error.response?.status || 500,
        message: "¡Ups! Hubo un problema obteniendo esta comunidad"
      });
    }
    setCommunity(_community);
  }

  const toggleInvite = () => {
    setInviteModalOpen(!inviteModalOpen);
  }

  useEffect(() => {
    fetchCommunity();
  }, [community_id])

  return (
      <React.Fragment>
        <MyNavbar/>
        <Container fluid>
          {community &&
              <>
                <Row className="mb-2">
                  <h1>{community.name} {community.owner === user._id &&
                      <Button className="ml-3" color="success" onClick={toggleInvite}>Invitar</Button>}
                  </h1>
                </Row>
                <Row className="h-100vh">
                  <Col className="col-md-5 col-sm-12">
                    <h2><i className="ni ni-world-2 text-gray"></i> Intercambios</h2>
                    <div className="users-container">

                    </div>
                  {/*  Intercambios */}
                  </Col>
                  <Col className="col-md-5 col-sm-12 vh-100">
                    <h2><i className="ni ni-chat-round text-gray"></i> Chat</h2>
                    <ChatRoom roomId={community_id}/>
                  </Col>
                  <Col className="col-md-2 col-sm-12">
                    <h2> <i className="ni ni-circle-08 text-gray"></i> Miembros</h2>
                    <div className="users-container">
                      <UsersList users={community.users}/>
                    </div>
                  </Col>
                </Row>
                <MyModal header="Invitar un miembro a la comunidad"
                         body={<CommunityInviteLink community={community}/>}
                         isOpen={inviteModalOpen}
                         onAccept={toggleInvite}
                />
              </>
          }
        </Container>
      </React.Fragment>
  )
}

export default Community;
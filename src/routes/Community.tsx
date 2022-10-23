import React from "react";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {NoUsersCommunity} from "../components/CommunityCard";
import client from "../services/config";
import MyNavbar from "../components/MyNavbar";
import {Col, Container, Row} from "reactstrap";
import ChatRoom from "../components/chat/ChatRoom";
import {useUser} from "../context/UserContext";
import { useErrorHandler } from "../context/ErrorHandler";


function Community() {
  const { community_id } = useParams();
  const user = useUser();
  const { setErrorResponse } = useErrorHandler();

  const [community, setCommunity] = useState<NoUsersCommunity|undefined>(undefined);
  const [responseStatusCode, setResponseStatusCode] = useState<number>();

  const fetchCommunity = async () => {
    if (!community_id) {
      return;
    }

    let _community: NoUsersCommunity | undefined = undefined;
    try {
      const response = await client.get(`/communities/${community_id}`, {
        headers: {
          'x-user-id': user._id
        }
      });
      _community = response.data
    } catch (error: any) {
      console.log(error.response || error.request || error.message);
      setErrorResponse({
        statusCode: error.response?.status || 500,
        message: "¡Ups! Hubo un problema obteniendo esta comunidad"
      });
    }
    setCommunity(_community);
  }

  useEffect(() => {
    fetchCommunity();
  }, [community_id])

  return (
      <React.Fragment>
        <MyNavbar/>
        <Container fluid>
          <Row>
            <h1>{community?.name}</h1>
          </Row>
          <Row>
            <Col className="col-md-4">

            </Col>
            <Col className="col-md-4 vh-100">
              <ChatRoom roomId={community_id}/>
            </Col>
            <Col className="col-md-4">

            </Col>
          </Row>
        </Container>
      </React.Fragment>
  )
}

export default Community;
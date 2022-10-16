import React from "react";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {NoUsersCommunity} from "../components/CommunityCard";
import client from "../services/config";
import MyNavbar from "../components/MyNavbar";
import {Col, Container, Row} from "reactstrap";
import ChatRoom from "../components/chat/ChatRoom";


function Community() {
  const { community_id } = useParams();
  const [community, setCommunity] = useState<NoUsersCommunity|undefined>(undefined);

  const fetchCommunity = async () => {
    if (!community_id) {
      return;
    }

    let _community: NoUsersCommunity | undefined = undefined;
    try {
      const response = await client.get(`/communities/${community_id}`);
      _community = response.data
    } catch (error: any) {
      console.log(error.response || error.request || error.message);
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
            <Col className="col-md-4 offset-md-8 vh-100">
              <ChatRoom roomId={community_id}/>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
  )
}

export default Community;
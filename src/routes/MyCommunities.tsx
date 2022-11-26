import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import {Badge, Button, Col, Container, ListGroup, ListGroupItem, Row} from "reactstrap";
import CreateCommunityModal, {CreateCommunityForm} from "../components/CreateCommunityModal";
import client from "../services/config";
import {CommunityCreationStrings} from "../res/strings";
import {useNavigate} from "react-router-dom";
import {fetchCommunities} from "../services/apicalls";
import Success from "../components/modals/Success";
import Error from "../components/modals/Error";
import MySpinner from "../components/spinner/MySpinner";
import {MAX_COMMUNITY_DESCR_LEN} from "../res/constants";

export type ICommunity = {
  "_id": string,
  "name": string,
  "owner": number,
}

const MyCommunities = () => {
  const user = useUser();
  const DESKTOP_SIZE = 730;
  const [showCreateCommunityFormModal, setShowCreateCommunityFormModal] = useState(false);
  const initialFormState: CreateCommunityForm = {
    name: "",
    password: "",
    description: ""
  };
  const [createCommunityForm, setCreateCommunityForm] = useState(initialFormState)
  const [fetchedCommunities, setCommunities] = useState<ICommunity[]>([])
  const initialModalState = {
    header: "",
    body: "",
  };
  const [showModalOk, setShowModalOk] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [modalOk, setModalOk] = useState(initialModalState);
  const [modalError, setModalError] = useState(initialModalState);
  const [createdCommunityId, setCreatedCommunityId] = useState<string>();
  const [isDesktop, setDesktop] = useState<boolean>(window.innerWidth >= DESKTOP_SIZE);

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    _fetchCommunities()
  }, [])

  const _fetchCommunities = async () => {
    setIsLoading(true)
    const fetchedCommunities = await fetchCommunities(undefined, user._id)
    setCommunities(fetchedCommunities)
    setIsLoading(false)
  }

  const isFormValid = () => {
    return (createCommunityForm.name.length > 0 && createCommunityForm.password.length > 0)
  }

  const createCommunity = async () => {
    if (!isFormValid()) {
      setModalError({header: CommunityCreationStrings.ERROR_HEAD, body: CommunityCreationStrings.BAD_FORM})
      setShowModalError(true)
      return
    }
    setShowCreateCommunityFormModal(false)
    const form = {
      name: createCommunityForm.name,
      password: createCommunityForm.password,
      owner: user._id,
      description: createCommunityForm.description,
      users: []
    }
    try {
      const {data: createdCommunity} = await client.post("/communities", form)
      console.log(createdCommunity);
      setCreatedCommunityId(createdCommunity._id);
      setModalOk({header: CommunityCreationStrings.OK_HEADER, body: CommunityCreationStrings.CREATED})
      setShowModalOk(true)
    } catch (error: any) {
      if (error.response) {
        if (error.response.data?.detail.includes("there is already a community with that name")) {
          setModalError({
            header: CommunityCreationStrings.ERROR_HEAD,
            body: CommunityCreationStrings.COMMUNITY_ALREADY_EXISTS
          })
          setShowModalError(true)
        }
        if (error.response.data?.detail.includes("user can't be in more than 10 communities")) {
          setModalError({header: CommunityCreationStrings.ERROR_HEAD, body: CommunityCreationStrings.COMMUNITY_LIMIT})
          setShowModalError(true)
        }
        if (error.response.data?.detail.includes("has not complete his profile")) {
          setModalError({
            header: CommunityCreationStrings.ERROR_HEAD,
            body: CommunityCreationStrings.PROFILE_NOT_COMPLETED
          })
          setShowModalError(true)
        }
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  }

  const onCreateCommunityClick = async () => {
    if (!user.is_profile_complete) {
      setModalError({
        header: CommunityCreationStrings.PROFILE_NOT_COMPLETED_TITLE,
        body: CommunityCreationStrings.PROFILE_NOT_COMPLETED
      })
      setShowModalError(true)
      return
    }
    setCreateCommunityForm(initialFormState)
    setShowCreateCommunityFormModal(true)
  }

  const handleChange = ({target: {name, value}}: any) => {
    if(name === "description" && value.length > MAX_COMMUNITY_DESCR_LEN){
      return
    }
    setCreateCommunityForm({...createCommunityForm, [name]: value});
  }

  const closeModalOk = () => {
    setShowModalOk(false)
    if (createdCommunityId) {
      navigate(`/communities/${createdCommunityId}`);
    }
  }

  const closeModalError = () => {
    setShowModalError(false)
    setModalError(initialModalState)
  }

  const viewCommunity = (event: any) => {
    let communityId = event.target.id;
    navigate(`/communities/${communityId}`)
  }

  const updateMedia = () => {
    setDesktop(window.innerHeight >= DESKTOP_SIZE)
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  })

  return (
    <React.Fragment>
      <MyNavbar/>
      <Container className={"bg-gradient-orange " + (isDesktop ? " overflow-hidden h-90vh" : "")} fluid>
        <Row>
          <Col lg={2} md={12}></Col>
          <Col className="offset-lg-1 mt-5 d-flex justify-content-center" lg={6} md={12}>
            <h1 className="text-center text-white">MIS COMUNIDADES</h1>
          </Col>
          <Col className="text-md-start text-lg-right text-xl-right text-sm-start mb-1 mt-lg-5" lg={3} md={5} sm={5}>
            <Button color="success" onClick={onCreateCommunityClick}>Crear Comunidad</Button>
          </Col>
        </Row>
        <Row>
          <Col lg={2} md={12}>
            {/*<Row>*/}
            {/*  <Col lg={12} md={6}>*/}
            {/*    <Button className="ml-0 mb-2" color="primary" block> Administrador </Button>*/}
            {/*  </Col>*/}
            {/*  <Col lg={12} md={6}>*/}
            {/*    <Button className="ml-0 mb-2" color="default" block> Todos </Button>*/}
            {/*  </Col>*/}
            {/*</Row>*/}
          </Col>
          <Col className="offset-lg-1" lg={6} md={12}>
            {/*<Row>*/}
            {/*  <Form className="navbar-search">*/}
            {/*    <FormGroup className="mb-0">*/}
            {/*      <InputGroup className="input-group-alternative bg-white">*/}
            {/*        <InputGroupText>*/}
            {/*          <i className="fas fa-search"/>*/}
            {/*        </InputGroupText>*/}
            {/*        <Input placeholder="Buscar" type="text" id="name" {...register("name", {*/}
            {/*          onChange: handleFilterChange()*/}
            {/*        })} />*/}
            {/*      </InputGroup>*/}
            {/*    </FormGroup>*/}
            {/*  </Form>*/}
            {/*</Row>*/}
            <ListGroup>
              {isLoading &&
                <div className="d-flex justify-content-center align-items-center h-65vh">
                  <MySpinner className="text-white-50" message={"Obteniendo comunidades..."}/>
                </div>
              }
              {!isLoading && fetchedCommunities
                .sort((a, b) => a.owner === user._id ? -1 : 0)
                .map((community, index) =>
                  <ListGroupItem className="justify-content-between" key={community._id} action onClick={viewCommunity}
                                 id={community._id} tag="button">
                    <span id={community._id} className="mr-2">{community.name}</span>
                    {user._id === community.owner &&
                      <Badge id={community._id} pill color="default">
                        ADMIN
                      </Badge>
                    }
                  </ListGroupItem>
                )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <CreateCommunityModal header={"Crear comunidad"}
                            body={"Completa con el nombre de la comunidad y agrega una contraseña"}
                            isOpen={showCreateCommunityFormModal}
                            onAccept={createCommunity}
                            onCancel={() => {
                              setShowCreateCommunityFormModal(false)
                            }}
                            form={createCommunityForm}
                            handleChange={handleChange}
      />
      <Success modal={modalOk} isOpen={showModalOk} onAccept={closeModalOk}/>
      <Error modal={modalError} isOpen={showModalError} onAccept={closeModalError}/>
    </React.Fragment>
  );

}

export default MyCommunities

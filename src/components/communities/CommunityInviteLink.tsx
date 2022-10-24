import {CommunityInfo} from "../../routes/Community";
import {API_URL} from "../../services/config";
import {Col, FormGroup, Input, Label, Row} from "reactstrap";


type Props = {
  community: CommunityInfo
}

const CommunityInviteLink = ({community} : Props) => {
    return (
        <>
          <h2 className="text-center text-orange">{community.name}</h2>
          <Row>
            <Col className="text-center offset-1" md={10}>
              <FormGroup>
                <Label style={{fontSize:14}}>Copia este URL y compartelo con tus amigos para que se puedan unir a tu comunidad</Label>
                <Input className="text-center"
                    value={window.location.href + "/join"}
                    disabled
                />
              </FormGroup>
            </Col>
          </Row>
        </>
    )
}

export default CommunityInviteLink;
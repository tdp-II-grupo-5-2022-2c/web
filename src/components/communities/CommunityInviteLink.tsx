import {CommunityInfo} from "../../routes/Community";
import {API_URL} from "../../services/config";
import {Col, FormGroup, Input, Row} from "reactstrap";


type Props = {
  community: CommunityInfo
}

const CommunityInviteLink = ({community} : Props) => {

  return (
      <>
        <h3 className="text-center">Comparte este link para invitar miembros a</h3>
        <h2 className="text-center text-orange">{community.name}</h2>
        <Row>
          <Col md="12">
            <FormGroup>
              <Input
                  value={API_URL + "/communities/" + community._id + "/join"}
              />
            </FormGroup>
          </Col>
        </Row>
      </>
  )
}

export default CommunityInviteLink;
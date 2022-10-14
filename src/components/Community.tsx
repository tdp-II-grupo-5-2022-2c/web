import {Card, CardBody, CardImgOverlay,} from "reactstrap";
import {globalCommunityStyles} from "../res/globalStyles";

// TODO: se llama asi pq todavia no tiene usuarios
export type NoUsersCommunity = {
  "_id": number,
  "name": string,
  "owner": number,
}

type Props = {
  community: NoUsersCommunity,
  isOwner: boolean
}

const Community = ({community, isOwner}: Props) => {

  return (
    <Card style={{...globalCommunityStyles.community}}>
      <CardBody>
        {isOwner &&
            <span style={{fontSize: 10}}
                  className="position-absolute top-0 end-0 badge rounded-pill bg-gradient-gray">
              &nbsp;Administrador&nbsp;
          </span>
        }
        <CardImgOverlay>
          <span className="text-bg-light">{community.name}</span>
          <br/>
        </CardImgOverlay>
      </CardBody>
    </Card>
  )
}

export default Community

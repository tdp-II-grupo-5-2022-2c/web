import {Button, Card, CardBody, CardFooter, CardImgOverlay,} from "reactstrap";
import {globalCommunityStyles} from "../../res/globalStyles";

// TODO: se llama asi pq todavia no tiene usuarios

type Props = {
  community: any,
  isOwner: boolean,
  onClick: (event: MouseEvent) => void,
}

const CommunityCard = ({community, isOwner, onClick}: Props) => {

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
      <CardFooter>
        {/*// @ts-ignore*/}
        <Button color="primary" id={community._id.toString()} onClick={onClick}>Ver</Button>
      </CardFooter>
    </Card>
  )
}

export default CommunityCard

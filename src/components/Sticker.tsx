import {Button, Card, CardBody, CardSubtitle, CardTitle} from "reactstrap";
import {formatDate} from "../utils/formatDate";

export type IPlayer = {
  id: number;
  name: string;
  dateOfBirth: Date;
  weight: number;
  height: number;
  position: string;
  country: string;
  image: string;
}

type Props = {player: IPlayer}

const Sticker = ({player}: Props) => {
  return (
    <Card
      style={{
        width: '18rem'
      }}
      className={"m-1"}
    >
      <img
        alt="Player"
        src={player.image}
      />
      <CardBody>
        <CardTitle tag="h5">
          {player.name}
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          {formatDate(player.dateOfBirth)}
        </CardSubtitle>
      </CardBody>
      <Button>
        Pegar
      </Button>
    </Card>
  )
}

export default Sticker

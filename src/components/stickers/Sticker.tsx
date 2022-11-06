import {Card} from "reactstrap";
import {globalStickerStyles} from "../../res/globalStyles";
import {DraggableTypes} from "../Draggable";
import {useDrag} from "react-dnd";
import StickerImg from "./StickerImg";

export type ISticker = {
  id: string;
  image: string;
  name: string;
  number: number;
  quantity: number
  country: string
  is_on_album: boolean
}

export type IStickerData = {
  _id: string,
  name: string,
  weight: number,
  height: number,
  position: string,
  country: string,
  image: string,
  number: number,
  date_of_birth: string
  quantity: number | undefined

}

type Props = {
  player: ISticker | IStickerData,
  style?: object,
  displayBadge?: boolean,
  displayQuantity?: boolean,
  showNotInAlbum?: boolean,
  cardClassName?: string,
  draggable?: boolean
}

const Sticker = ({
                   player,
                   style = {},
                   displayBadge = false,
                   displayQuantity = true,
                   showNotInAlbum = false,
                   cardClassName = "",
                   draggable = false
     }: Props) => {


  const [{isDragging}, dragRef] = useDrag(
      () => ({
        type: DraggableTypes.STICKER,
        item: player,
        collect: (monitor) => ({
          isDragging: monitor.isDragging()
        })
      }),
      []
  )

  return (
    <Card
        style={{...globalStickerStyles.sticker, ...style}}
        className={cardClassName}
    >
      {displayBadge && displayQuantity && player.quantity !== undefined && player.quantity > 1 &&
          <span style={{fontSize: 25 }} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-gradient-gray">
            &nbsp;{player.quantity}&nbsp;
          </span>}
      {!displayBadge && showNotInAlbum &&
        <span style={{fontSize: 20}} className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-gradient-neutral"
        id="not_in_album">
          <i className="ni ni-diamond text-cyan align-text-bottom"></i>
        </span>
      }
      {draggable &&
          <div className="p-0 m-0 w-100 h-100" ref={dragRef}>
            <StickerImg player={player} showNotInAlbum={showNotInAlbum} />
          </div>
      }
      {!draggable && <StickerImg player={player} showNotInAlbum={showNotInAlbum}/> }
    </Card>
  )
}

export default Sticker

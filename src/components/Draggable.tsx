import {useDrag} from "react-dnd";
import {ISticker, IStickerData} from "./Sticker";

export const DraggableTypes = {
  STICKER: "sticker"
}

type Props = {
  sticker: ISticker | IStickerData;
  children?: any
  type: string
}

export const Draggable = ({sticker, children, type} : Props) => {

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: type,
      item: sticker,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  return (
    <div className="p-0" ref={dragRef} style={{opacity}} >
      {children}
    </div>
  )


}

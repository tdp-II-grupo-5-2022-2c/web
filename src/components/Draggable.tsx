import {useDrag} from "react-dnd";
import {ISticker} from "./Sticker";

export const DraggableTypes = {
  STICKER: "sticker"
}

type Props = {
  sticker: ISticker;
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
    <div ref={dragRef} style={{ opacity }}>
      {children}
    </div>
  )


}

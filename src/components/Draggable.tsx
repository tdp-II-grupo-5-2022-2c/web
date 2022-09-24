import {useDrag} from "react-dnd";

export const DraggableTypes = {
  STICKER: "sticker"
}

type Props = {
  childrenId: number;
  children?: any
  type: string
}

export const Draggable = ({childrenId, children, type} : Props) => {

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: type,
      item: {id: childrenId},
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

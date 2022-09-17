
import {useDrag} from "react-dnd";

type Props = {
  childrenId: number;
  children?: any
}

export const Draggable = ({childrenId, children} : Props) => {

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "sticker",
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

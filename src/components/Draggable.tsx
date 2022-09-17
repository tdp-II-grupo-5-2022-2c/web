
import {useDrag} from "react-dnd";

export const Draggable = ({isDragging, children} : any) => {

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "sticker",
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

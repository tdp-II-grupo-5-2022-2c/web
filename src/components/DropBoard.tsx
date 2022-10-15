
type Props = {
  title: string,
  body: string,
}

const DropBoard = ({title, body}: Props) => {

  const styles = {
    board:{
      width: "18rem",
    }
  }

  return(
    <div className="card" style={styles.board}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
        </div>
    </div>
  )
}

export default DropBoard

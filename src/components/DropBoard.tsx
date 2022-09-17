
const DropBoard = () => {

  const styles = {
    board:{
      width: "18rem",
    }
  }

  return(
    <div className="card" style={styles.board}>
        <div className="card-body">
          <h5 className="card-title">Pegar en album</h5>
          <p className="card-text">Arrastra hasta aqui la figurita que quieres pegar</p>
        </div>
    </div>
  )
}

export default DropBoard

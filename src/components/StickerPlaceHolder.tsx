import {globalStickerStyles} from "../res/globalStyles";
import {albumColors, qatarColors} from "../res/themes";
import React from "react";
import {Button, Card, CardBody, CardHeader, CardText, CardTitle, Row} from "reactstrap";

// TODO: quitar esto pq solo me sirve para data mockeada
export type ISlicedPlayer = {
  id: number;
  name: string;
  country: string
}

type IStickerPlaceHolder = {
  country: string,
  index: number,
  position?: number,
  pasteId?: string,
  onPaste?: (pasteId: string) => void,
  style?: object
}

type Props = IStickerPlaceHolder

const StickerPlaceHolder = ({country, position, index, pasteId, onPaste, style = {}}: Props) => {

  const styles = {
    stickerPlaceHolder:{
      ...globalStickerStyles.sticker,
      ...{backgroundColor: albumColors.primary},
      ...style
    },
    text:{
      color: qatarColors.primary
    }
  }

  const formatCountry = (countryName : String) => {
    const firstThreeLetters = 3
    return countryName.slice(0,firstThreeLetters).toUpperCase()
  }

  const formatNumber = (number : Number) => {
    return number.toLocaleString('en-US',{
      minimumIntegerDigits: 2
    })
  }

  //TODO: renderizado condicional, si no tengo figurita renderizo el placeholder, caso contrario
  // renderizo la figurita que recibo por props
  return (
    <Card style={styles.stickerPlaceHolder}>
      <CardBody className="d-flex flex-column justify-content-between">
        <Row>
          <span className="h1 font-weight-bold" style={styles.text}>{formatCountry(country)}</span>
        </Row>
        <Row>
          <span className="h1 font-weight-bold" style={styles.text}>{formatNumber(index)}</span>
        </Row>
        {/*<p className="card-text" style={styles.text}>{player.name}</p>*/}
        <Row>
          {pasteId && position === index && onPaste && <Button color="primary" size="sm" className="m-2" onClick={() => onPaste(pasteId)}>Pegar</Button>}
        </Row>
      </CardBody>
    </Card>
  )
}

export default StickerPlaceHolder

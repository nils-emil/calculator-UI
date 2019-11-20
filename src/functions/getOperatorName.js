import { DIVISION, DIVISION_SYMBOL, MINUS, MINUS_SYMBOL, MULIPLICATION, PLUS, PLUS_SYMBOL } from '../constants/operators'

function getOperationName (string) {
  if (string === DIVISION_SYMBOL) return DIVISION
  if (string === PLUS_SYMBOL) return PLUS
  if (string === MINUS_SYMBOL) return MINUS
  return MULIPLICATION
}

export default getOperationName

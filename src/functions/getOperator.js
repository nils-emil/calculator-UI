import { DIVISION, DIVISION_SYMBOL, MINUS, MINUS_SYMBOL, MULIPLICATION_SYMBOL, PLUS, PLUS_SYMBOL } from '../constants/operators'

function getOperator (string) {
  if (string === DIVISION) return DIVISION_SYMBOL
  if (string === PLUS) return PLUS_SYMBOL
  if (string === MINUS) return MINUS_SYMBOL
  return MULIPLICATION_SYMBOL
}

export default getOperator

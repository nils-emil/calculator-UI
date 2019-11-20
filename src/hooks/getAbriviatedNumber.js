// If the result is really big then we should bring it to Exponential form and shorten it that way.
function getAbriviatedNumber (number, maxlen) {
  let processedResult = number
  if (number.toString().length > maxlen) {
    processedResult = parseFloat(number).toExponential()
    if (processedResult.toString().length > maxlen) {
      let exponentionIndex = processedResult.indexOf('e')
      let lastIndex = processedResult.length - 1
      return processedResult.toString().substr(0, maxlen - (lastIndex - exponentionIndex))
        + processedResult.toString().substr(exponentionIndex, lastIndex)
    }
    return processedResult
  }
  return number;
}

export default getAbriviatedNumber

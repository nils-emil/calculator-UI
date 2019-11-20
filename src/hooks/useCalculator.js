import Axios from 'axios-observable'
import { useState } from 'react'

function useCalculationsRepo () {

  const [result, setResult] = useState(0)

  const calculate = (num1, num2, operation) => {
    if (!num1 || !num2 || !operation) {
      setResult(0)
      return;
    }
    const payload = {
      num1: num1,
      num2: num2,
      operation: operation
    }
    Axios.post('/calculate', payload)
      .subscribe(result => {
        setResult(result.data)
      })
  }

  return [result, calculate]
}

export default useCalculationsRepo

import Axios from 'axios-observable'
import { useState } from 'react'

function useCalculationsRepo () {

  const [result, setResult] = useState(0)
  const [error, setError] = useState('')

  const calculate = (num1, num2, operation) => {
    if (!num1 || !num2 || !operation) {
      setResult(0)
      setError('')
      return;
    }
    const payload = {
      num1: num1,
      num2: num2,
      operation: operation
    }
    Axios.post('/calculate', payload)
      .subscribe(result => {
          setError('')
          setResult(result.data)
        },
        (error) => {
          setResult(0)
          setError(error.response.data)
        })
  }

  return [result, error, calculate]
}

export default useCalculationsRepo

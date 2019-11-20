import Axios from 'axios-observable'
import { useEffect, useState } from 'react'

function useAllCalculationsRepo () {

  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(true)

  function refreshAllCalculations () {
    Axios.get('/getResults')
      .subscribe(result => {
        console.log(result.data)
        setResult(result.data)
        setLoading(false)
      }, () => {
        setResult(['2', '3'])
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true)
    refreshAllCalculations()
  }, [])

  return [loading, result]
}

export default useAllCalculationsRepo

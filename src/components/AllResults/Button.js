import React from 'react'
import useAllCalculationsRepo from '../../hooks/useCalculationsRepo'
import getOperator from '../../hooks/getOperator'

function AllResults (props) {

  const [loading, allResults] = useAllCalculationsRepo()

  if (loading) {
    return (<p>LOADING</p>)
  }

  return (
    <div>
      {allResults.map((text) => (
        <p>{text.num1} {getOperator(text.operation)} {text.num1} = {text.result}</p>
      ))}
    </div>)
}

export default AllResults

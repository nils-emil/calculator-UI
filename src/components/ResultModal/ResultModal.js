import React from 'react'
import './styles.scss'
import useAllCalculationsRepo from '../../hooks/useCalculationsRepo'
import getOperator from '../../hooks/getOperator'
import getAbriviatedNumber from '../../hooks/getAbriviatedNumber'

function ResultModal (props) {
  const [loading, allResults] = useAllCalculationsRepo()

  let content = null
  if (loading) {
    content = <div>Loading</div>
  } else {
    content = allResults.map((text) => (
      <p>
        <hr/>
        {getAbriviatedNumber(text.num1, 8)} {getOperator(text.operation)} {getAbriviatedNumber(text.num2, 8)} = {getAbriviatedNumber(text.num1, 8)}
      </p>
    ))
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span onClick={props.onCloseClick} className="close">&times;</span>
          <h2>All previous calculation results</h2>
        </div>
        <div className="modal-body">
          {content}
        </div>
      </div>
    </div>
  )

}

export default ResultModal

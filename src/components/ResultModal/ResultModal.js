import React from 'react'
import './styles.scss'
import useAllCalculationsRepo from '../../functions/useCalculationsRepo'
import getOperator from '../../functions/getOperator'
import getAbriviatedNumber from '../../functions/getAbriviatedNumber'

function ResultModal (props) {
  const [loading, allResults] = useAllCalculationsRepo()

  let content = null
  if (loading) {
    content = <div className='placeholder-text'>Loading</div>
  } else if (allResults.length === 0) {
    content = <div className='placeholder-text'>No results to show</div>
  } else {
    content = allResults.map((text) => (
      <p>
        {getAbriviatedNumber(text.num1, 8) +
        getOperator(text.operation) +
        getAbriviatedNumber(text.num2, 8) +
        '=' +
        getAbriviatedNumber(text.result, 8)}
        <hr/>
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

import React, { useEffect, useState } from 'react'
import './App.scss'
import axios from 'axios'
import Button from './components/Button/Button'
import useCalculationsRepo from './functions/useCalculator'
import getOperationName from '../src/functions/getOperatorName'
import getAbriviatedNumber from './functions/getAbriviatedNumber'
import { BTN_DARK_GRAY, BTN_LIGHT_GRAY, BTN_ORANGE } from './constants/buttonTypes'
import {
  DECIMAL_POINT,
  DIVISION_SYMBOL,
  EQUALS_SYMBOL,
  MINUS_SYMBOL,
  MULIPLICATION_SYMBOL,
  PLUS_SYMBOL
} from './constants/operators'
import ResultModal from './components/ResultModal/ResultModal'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post['Content-Type'] = 'application/json'

function App () {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [operation, setOperation] = useState('')
  // if num1 isnt active then that means num2 is active
  const [num1Active, setNum1Active] = useState(true)
  const [result, error, calculateResult] = useCalculationsRepo(num1, num2, operation)

  useEffect(() => {}, [num1, num2, operation])

  function appendValueToActiveNumber (value) {
    if (num1Active) {
      setNum1(num1 + value)
    } else {
      setNum2(num2 + value)
    }
  }

  const calculatorClickedHandler = (value) => {
    if (value === '.' && num1Active && num1.length === 0) {
      setNum1('0.')
      return
    } else if (value === '.' && !num1Active && num2.length === 0) {
      setNum2('0.')
      return
    }
    appendValueToActiveNumber(value)
  }

  const operatorClickedHandler = (operation) => {
    if (operation === MINUS_SYMBOL && num1Active && num1.length === 0) {
      setNum1('-0')
      return
    }
    if (operation === MINUS_SYMBOL && !num1Active && num2.length === 0) {
      setNum2('-0')
      return
    }
    if (num1Active) {
      setNum1Active(false)
    }
    setOperation(operation)
  }

  const clearCalculator = () => {
    setNum1('')
    setNum2('')
    setOperation('')
    setNum1Active(true)
    calculateResult()
  }

  const calculateRes = () => {
    calculateResult(num1, num2, getOperationName(operation))
  }

  const currentActiveInputAlreadyHasDecimal = () => {
    return (num1Active) ? num1.indexOf('.') > -1 : num2.indexOf('.') > -1
  }

  const resultClasses = 'calculation-result'

  return (
    <React.Fragment>
      <div className="App">
        <header className="calculator-result">
          <span>
            <div className='calculation'>
              {getAbriviatedNumber(num1, 13)} {operation} {getAbriviatedNumber(num2, 13)}
            </div>
            <div className={resultClasses}>
              {error ? <p className="error">{error}</p> : getAbriviatedNumber(result, 8)}
            </div>
          </span>
        </header>
        <section>
          <div>
            <Button wideButton={false} onButtonClick={() => { clearCalculator() }} value={'C'} color={BTN_LIGHT_GRAY}/>
            <Button wideButton={true} onButtonClick={setModalOpen} value={'Results'}
              color={BTN_LIGHT_GRAY}/>
            <Button wideButton={false} onButtonClick={operatorClickedHandler} value={DIVISION_SYMBOL}
              color={BTN_ORANGE}/>
          </div>
          <div>
            <Button wideButton={false} onButtonClick={calculatorClickedHandler} value={7} color={BTN_DARK_GRAY}/>
            <Button wideButton={false} onButtonClick={calculatorClickedHandler} value={8} color={BTN_DARK_GRAY}/>
            <Button wideButton={false} onButtonClick={calculatorClickedHandler} value={9} color={BTN_DARK_GRAY}/>
            <Button wideButton={false} onButtonClick={operatorClickedHandler} value={MULIPLICATION_SYMBOL}
              color={BTN_ORANGE}/>
          </div>
          <div>
            <Button wideButton={false} onButtonClick={calculatorClickedHandler} value={4} color={BTN_DARK_GRAY}/>
            <Button wideButton={false} onButtonClick={calculatorClickedHandler} value={5} color={BTN_DARK_GRAY}/>
            <Button wideButton={false} onButtonClick={calculatorClickedHandler} value={6} color={BTN_DARK_GRAY}/>
            <Button wideButton={false} onButtonClick={operatorClickedHandler} value={MINUS_SYMBOL} color={BTN_ORANGE}/>
          </div>
          <div>
            <Button wideButton={false} onButtonClick={calculatorClickedHandler} value={1} color={BTN_DARK_GRAY}/>
            <Button wideButton={false} onButtonClick={calculatorClickedHandler} value={2} color={BTN_DARK_GRAY}/>
            <Button wideButton={false} onButtonClick={calculatorClickedHandler} value={3} color={BTN_DARK_GRAY}/>
            <Button wideButton={false} onButtonClick={operatorClickedHandler} value={PLUS_SYMBOL} color={BTN_ORANGE}/>
          </div>
          <div>
            <Button wideButton={true} onButtonClick={calculatorClickedHandler} value={0} color={BTN_DARK_GRAY}/>
            <Button wideButton={false}
              disabled={currentActiveInputAlreadyHasDecimal()}
              onButtonClick={calculatorClickedHandler}
              color={BTN_ORANGE}
              value={DECIMAL_POINT}
            />
            <Button wideButton={false} onButtonClick={() => { calculateRes() }} value={EQUALS_SYMBOL} color={BTN_ORANGE}/>
          </div>
        </section>
      </div>
      {isModalOpen ? <ResultModal onCloseClick={() => { setModalOpen(false) }}></ResultModal> : ''}
    </React.Fragment>
  )
}

export default App

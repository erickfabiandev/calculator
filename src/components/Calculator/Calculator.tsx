import { Component } from 'react';
import Screen from '../Screen/Screen';
import ButtonPanel from '../ButtonPanel/ButtonPanel';
import './Calculator.scss'

interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operator: string | null;
  secondNumber: boolean
}

class Calculator extends Component<object, CalculatorState>{

  state: CalculatorState = {
    currentValue: '0',
    previousValue: '',
    operator: null,
    secondNumber: false
  }

  componentDidMount() {
    const storedData = localStorage.getItem('calculatorData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      this.setState(parsedData)
    }
  }

  componentDidUpdate() {
    localStorage.setItem('calculatorData', JSON.stringify(this.state))
  }

  handleButtonClick = (value: string) => {
    if (value.match(/[0-9]/)) {
      if (this.state.currentValue === '0' || this.state.currentValue === 'Error' || this.state.secondNumber) {
        this.setState({ currentValue: value, secondNumber: false });
      } else {
        this.setState((prevState) => ({
          currentValue: prevState.currentValue.length < 14 ? prevState.currentValue + value : prevState.currentValue,
        }));
      }
    } else if (value.match(/[\+\-\x\/]/)) {
      if (!this.state.operator) {
        this.setState((prevState) => ({
          operator: value,
          previousValue: prevState.currentValue,
          secondNumber: true
        }));
      }
    } else if (value === '=') {
      if (this.state.operator && this.state.previousValue) {
        const result = this.calculateResult(
          parseFloat(this.state.previousValue),
          parseFloat(this.state.currentValue),
          this.state.operator
        );

        this.setState({
          currentValue: result != 'Error' ? parseFloat(result.toFixed(13)).toString() : result,
          previousValue: '',
          operator: null,
        });
      }
    } else if (value === 'C') {
      this.setState({
        currentValue: '0',
        previousValue: '',
        operator: null,
      });
    } else if (value === 'DEL') {
      this.setState(prevState => ({
        currentValue: prevState.currentValue.length > 1 ? prevState.currentValue.slice(0, -1) : '0'
      }));
    } else if (value === '.') {
      this.setState(prevState => ({
        currentValue: (!prevState.currentValue.includes('.') && this.state.currentValue.length < 14) ? prevState.currentValue + value : prevState.currentValue
      }));
    }
  };

  calculateResult = (prevValue: number, currentValue: number, operator: string) => {
    switch (operator) {
      case '+':
        return prevValue + currentValue;
      case '-':
        return prevValue - currentValue;
      case 'x':
        return prevValue * currentValue;
      case '/':
        if (currentValue === 0) {
          return 'Error';
        }
        return prevValue / currentValue;
      default:
        return 'Error';
    }
  };

  render() {
    return (
      <div className='calculator'>
        <Screen currentValue={this.state.currentValue} />
        <ButtonPanel onClick={this.handleButtonClick} />
      </div>
    );
  }
}

export default Calculator;
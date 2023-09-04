import { Component } from 'react';
import Screen from '../Screen/Screen';
import ButtonPanel from '../ButtonPanel/ButtonPanel';
import './Calculator.scss'

interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operator: string | null;
}

class Calculator extends Component<object, CalculatorState>{

  state: CalculatorState = {
    currentValue: '0',
    previousValue: '',
    operator: null
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
      if (this.state.currentValue === '0') {
        this.setState({ currentValue: value });
      } else {
        this.setState((prevState) => ({
          currentValue: prevState.currentValue + value,
        }));
      }
    } else if (value.match(/[\+\-\*\/]/)) {
      if (!this.state.operator) {
        this.setState((prevState) => ({
          operator: value,
          previousValue: prevState.currentValue,
          currentValue: '0',
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
          currentValue: result.toString(),
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
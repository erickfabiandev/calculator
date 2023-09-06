import Button from "../components/Button/Button";
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('Button calculator testing ', () => {
  test('renders a button with the correct text', () => {
    //Arrange
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>1</Button>);
    //Act
    const buttonElement = screen.getByText('1');
    //Assert
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick prop when button is clicked', () => {
    //Arrange
    const onClickMock = jest.fn();
    const { getByText } = render(<Button onClick={onClickMock}>2</Button>);
    //Act
    const buttonElement = getByText('2');
    fireEvent.click(buttonElement);
    //Assert
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
import Button from "../components/Button/Button";
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

test('renders a button with the correct text', () => {
  //Arange
  render(<Button onClick={() => { }}>1</Button>);
  const buttonElement = screen.getByText('1');
  expect(buttonElement).toBeInTheDocument();
})

test('calls onClick prop when button is clicked', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(<Button onClick={onClickMock}>2</Button>);
  const buttonElement = getByText('2');

  fireEvent.click(buttonElement);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});
import { render } from '@testing-library/react';
import Screen from '../components/Screen/Screen';
import '@testing-library/jest-dom';


describe('Screen calculator testing', () => {
  test('it should display the current value', () => {
    //Arrange
    const value = '42'
    const { getByText } = render(<Screen currentValue={value} />);

    //Act
    const screenElement = getByText('42');

    //Assert
    expect(screenElement).toBeInTheDocument();
  });

});

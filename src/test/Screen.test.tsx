import { render } from '@testing-library/react';
import Screen from '../components/Screen/Screen';
import '@testing-library/jest-dom';


test('it should display the current value', () => {
  const { getByText } = render(<Screen currentValue="42" />);

  const screenElement = getByText('42');

  expect(screenElement).toBeInTheDocument();
});

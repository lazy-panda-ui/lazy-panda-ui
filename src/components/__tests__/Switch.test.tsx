import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Switch } from '../Switch';

describe('Switch', () => {
  it('renders with value', () => {
    const { toJSON } = render(<Switch value={true} onValueChange={() => {}} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onValueChange', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <Switch value={false} onValueChange={onValueChange} testID="switch" />
    );
    fireEvent(getByTestId('switch'), 'valueChange', { value: true });
    expect(onValueChange).toHaveBeenCalledWith({ value: true });
  });
});

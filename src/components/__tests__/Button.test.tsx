import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with title', () => {
    const { getByText } = render(<Button title="Click Me" onPress={() => {}} />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Press" onPress={onPressMock} />);
    fireEvent.press(getByText('Press'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    const { getByTestId } = render(
      <Button title="Disabled" onPress={() => {}} disabled testID="button-disabled" />
    );
    const button = getByTestId('button-disabled');
    expect(button.props.accessibilityState.disabled).toBe(true);
  });
});

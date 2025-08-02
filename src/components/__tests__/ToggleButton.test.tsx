import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ToggleButton } from '../ToggleButton';

describe('ToggleButton', () => {
  it('renders with label', () => {
    const { getByText } = render(<ToggleButton label="On" selected={false} onPress={() => {}} />);
    expect(getByText('On')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<ToggleButton label="On" selected={false} onPress={onPress} />);
    fireEvent.press(getByTestId('toggle-button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('toggles selected state visually', () => {
    const { getByTestId, rerender } = render(
      <ToggleButton label="On" selected={false} onPress={() => {}} />
    );
    // Flatten style array for easier checking
    const getBackgroundColor = () => {
      const style = getByTestId('toggle-button').props.style;
      if (Array.isArray(style)) {
        const merged = Object.assign({}, ...style);
        return merged.backgroundColor;
      }
      return style.backgroundColor;
    };
    expect(getBackgroundColor()).not.toBe('#007AFF'); // Not selected
    rerender(<ToggleButton label="On" selected={true} onPress={function() {}} />);
    expect(getBackgroundColor()).toBe('#007AFF'); // Selected
  });
});

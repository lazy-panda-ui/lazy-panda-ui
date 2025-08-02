import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ButtonGroup } from '../ButtonGroup';

describe('ButtonGroup', () => {
  it('renders all buttons', () => {
    const { getByTestId } = render(
      <ButtonGroup
        buttons={[
          { label: 'A', onPress: jest.fn() },
          { label: 'B', onPress: jest.fn() },
        ]}
        selectedIndex={0}
      />
    );
    expect(getByTestId('button-group-item-0')).toBeTruthy();
    expect(getByTestId('button-group-item-1')).toBeTruthy();
  });

  it('calls onPress for the correct button', () => {
    const onPressA = jest.fn();
    const onPressB = jest.fn();
    const { getByTestId } = render(
      <ButtonGroup
        buttons={[
          { label: 'A', onPress: onPressA },
          { label: 'B', onPress: onPressB },
        ]}
        selectedIndex={0}
      />
    );
    fireEvent.press(getByTestId('button-group-item-1'));
    expect(onPressB).toHaveBeenCalled();
    expect(onPressA).not.toHaveBeenCalled();
  });
});

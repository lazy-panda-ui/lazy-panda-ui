import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('shows tooltip on press in', () => {
    const { getByTestId, queryByTestId } = render(
      <Tooltip text="Info">Press me</Tooltip>
    );
    // Tooltip should not be visible initially
    expect(queryByTestId('tooltip-content')).toBeNull();
    // Simulate press in
    const trigger = getByTestId('tooltip-trigger');
    fireEvent(trigger, 'pressIn');
    expect(queryByTestId('tooltip-content')).toBeTruthy();
    // Simulate press out
    fireEvent(trigger, 'pressOut');
    expect(queryByTestId('tooltip-content')).toBeNull();
  });
});

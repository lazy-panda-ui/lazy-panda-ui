import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Accordion } from '../Accordion';

describe('Accordion', () => {
  it('renders title', () => {
    const { getByText } = render(<Accordion title="Section">Content</Accordion>);
    expect(getByText('Section')).toBeTruthy();
  });

  it('shows content when pressed', () => {
    const { getByTestId, queryByTestId } = render(<Accordion title="Section">Content</Accordion>);
    expect(queryByTestId('accordion-content')).toBeNull();
    fireEvent.press(getByTestId('accordion-header'));
    expect(getByTestId('accordion-content')).toBeTruthy();
    expect(getByTestId('accordion-content').children.length).toBeGreaterThan(0);
  });
});

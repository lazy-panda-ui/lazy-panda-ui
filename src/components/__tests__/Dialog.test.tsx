import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Dialog } from '../Dialog';

describe('Dialog', () => {
  it('renders with title', () => {
    const { getByTestId } = render(<Dialog open={true} title="Dialog Title" onClose={() => {}} />);
    expect(getByTestId('dialog-title').props.children).toBe('Dialog Title');
  });

  it('renders children', () => {
    const { getByText } = render(
      <Dialog open={true} title="Dialog Title" onClose={function() {}}>
        <Text>Dialog Content</Text>
      </Dialog>
    );
    expect(getByText('Dialog Content')).toBeTruthy();
  });
});

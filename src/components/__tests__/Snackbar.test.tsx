import React from 'react';
import { render } from '@testing-library/react-native';
import { Snackbar } from '../Snackbar';

describe('Snackbar', () => {
  it('renders when open', () => {
    const { getByText } = render(<Snackbar message="Hello" open />);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('does not render when not open', () => {
    const { queryByText } = render(<Snackbar message="Hello" open={false} />);
    expect(queryByText('Hello')).toBeNull();
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { Table } from '../Table';

describe('Table', () => {
  it('renders headers and rows', () => {
    const columns = ['Name', 'Age'];
    const data = [
      ['Alice', '30'],
      ['Bob', '25']
    ];
    const { getByText } = render(<Table columns={columns} data={data} />);
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Alice')).toBeTruthy();
    expect(getByText('Bob')).toBeTruthy();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FileTable from '../FileTable';

const mockStore = configureStore([]);

describe('FileTable', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      files: {
        filesData: [{
          file: 'test.csv',
          lines: [{
            text: 'test',
            number: 123,
            hex: '70ad29aacf0b690b0467fe2b2767f765'
          }]
        }]
      }
    });
  });

  it('renders table headers correctly', () => {
    render(
      <Provider store={store}>
        <FileTable />
      </Provider>
    );

    expect(screen.getByText('File Name')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Number')).toBeInTheDocument();
    expect(screen.getByText('Hex')).toBeInTheDocument();
  });

  it('renders file data correctly', () => {
    render(
      <Provider store={store}>
        <FileTable />
      </Provider>
    );

    expect(screen.getByText('test.csv')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('70ad29aacf0b690b0467fe2b2767f765')).toBeInTheDocument();
  });
});
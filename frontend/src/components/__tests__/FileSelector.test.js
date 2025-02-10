import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FileSelector from '../FileSelector';

const mockStore = configureStore([]);

describe('FileSelector', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      files: {
        filesList: ['file1.csv', 'file2.csv'],
        selectedFile: ''
      }
    });
    store.dispatch = jest.fn();
  });

  it('renders all file options', () => {
    render(
      <Provider store={store}>
        <FileSelector />
      </Provider>
    );

    expect(screen.getByText('All Files')).toBeInTheDocument();
    expect(screen.getByText('file1.csv')).toBeInTheDocument();
    expect(screen.getByText('file2.csv')).toBeInTheDocument();
  });

  it('dispatches setSelectedFile when selection changes', () => {
    render(
      <Provider store={store}>
        <FileSelector />
      </Provider>
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'file1.csv' }
    });

    expect(store.dispatch).toHaveBeenCalled();
  });
});
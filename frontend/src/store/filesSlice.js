import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

export const fetchFilesList = createAsyncThunk(
  'files/fetchFilesList',
  async () => {
    const response = await api.getFilesList();
    return response.files;
  }
);

export const fetchFilesData = createAsyncThunk(
  'files/fetchFilesData',
  async (fileName) => {
    const response = await api.getFilesData(fileName);
    return response;
  }
);

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    filesList: [],
    filesData: [],
    selectedFile: '',
    status: 'idle',
    error: null
  },
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilesList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilesList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filesList = action.payload;
      })
      .addCase(fetchFilesList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFilesData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilesData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filesData = action.payload;
      })
      .addCase(fetchFilesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setSelectedFile } = filesSlice.actions;
export default filesSlice.reducer;
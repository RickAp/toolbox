import filesReducer, { 
    setSelectedFile, 
    fetchFilesList, 
    fetchFilesData 
  } from '../filesSlice'
  
  describe('filesSlice', () => {
    const initialState = {
      filesList: [],
      filesData: [],
      selectedFile: '',
      status: 'idle',
      error: null
    }
  
    it('should handle initial state', () => {
      expect(filesReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })
  
    it('should handle setSelectedFile', () => {
      const actual = filesReducer(initialState, setSelectedFile('file1.csv'))
      expect(actual.selectedFile).toEqual('file1.csv')
    })
  
    it('should handle fetchFilesList.pending', () => {
      const action = { type: fetchFilesList.pending.type }
      const state = filesReducer(initialState, action)
      expect(state.status).toEqual('loading')
    })
  
    it('should handle fetchFilesList.fulfilled', () => {
      const payload = ['file1.csv', 'file2.csv']
      const action = { type: fetchFilesList.fulfilled.type, payload }
      const state = filesReducer(initialState, action)
      expect(state.status).toEqual('succeeded')
      expect(state.filesList).toEqual(payload)
    })
  
    it('should handle fetchFilesData.fulfilled', () => {
      const payload = [
        {
          file: 'file1.csv',
          lines: [
            {
              text: 'test',
              number: 123,
              hex: '70ad29aacf0b690b0467fe2b2767f765'
            }
          ]
        }
      ]
      const action = { type: fetchFilesData.fulfilled.type, payload }
      const state = filesReducer(initialState, action)
      expect(state.status).toEqual('succeeded')
      expect(state.filesData).toEqual(payload)
    })
});
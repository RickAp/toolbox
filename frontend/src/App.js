import React, { useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FileTable from './components/FileTable';
import FileSelector from './components/FileSelector';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchFilesList, fetchFilesData } from './store/filesSlice';
import { selectStatus, selectError, selectSelectedFile } from './store/selectors';

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const selectedFile = useSelector(selectSelectedFile);

  useEffect(() => {
    dispatch(fetchFilesList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFilesData(selectedFile));
  }, [dispatch, selectedFile]);

  return (
    <Container fluid className="p-0">
      <div className="bg-danger text-white p-3 mb-4">
        <h1 className="h3 mb-0">Toolbox OTT</h1>
      </div>
      
      <Container>
        <FileSelector />

        {error && (
          <Alert variant="danger">{error}</Alert>
        )}

        {status === 'loading' ? (
          <LoadingSpinner />
        ) : (
          <FileTable />
        )}
      </Container>
    </Container>
  );
};

export default App;
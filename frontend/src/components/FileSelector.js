import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedFile } from '../store/filesSlice';
import { selectFilesList, selectSelectedFile } from '../store/selectors';

const FileSelector = () => {
  const dispatch = useDispatch();
  const files = useSelector(selectFilesList);
  const selectedFile = useSelector(selectSelectedFile);

  const handleFileSelect = (event) => {
    dispatch(setSelectedFile(event.target.value));
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Select File</Form.Label>
      <Form.Select 
        value={selectedFile} 
        onChange={handleFileSelect}
      >
        <option value="">All Files</option>
        {files.map((file) => (
          <option key={file} value={file}>
            {file}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default FileSelector;
import React from 'react';
import { Table, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectFilesData, selectSelectedFile } from '../store/selectors';

const FileTable = () => {
  const filesData = useSelector(selectFilesData);
  const selectedFile = useSelector(selectSelectedFile);

  const flattenedData = filesData.reduce((acc, fileData) => {
    return acc.concat(
      fileData.lines.map(line => ({
        fileName: fileData.file,
        ...line
      }))
    );
  }, []);

  if (flattenedData.length === 0 && selectedFile) {
    return (
      <Alert variant="info">
        No valid data found in file {selectedFile}. The file might be empty or contain invalid data.
      </Alert>
    );
  }

  return (
    <div className="table-container">
      {flattenedData.length === 0 ? (
        <Alert variant="info">
          Select a file to view its contents
        </Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {flattenedData.map((row, index) => (
              <tr key={index}>
                <td>{row.fileName}</td>
                <td>{row.text}</td>
                <td>{row.number}</td>
                <td>{row.hex}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default FileTable;
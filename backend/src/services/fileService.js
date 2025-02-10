import axios from 'axios';
import { parse } from 'csv-parse/sync';
import { EXTERNAL_API } from '../config/constants.js';

export class FileService {
  constructor(httpClient = null) {
    this.httpClient = httpClient || axios.create({
      baseURL: EXTERNAL_API.BASE_URL,
      headers: {
        'authorization': EXTERNAL_API.API_KEY
      }
    });
  }

  async getFilesList() {
    const response = await this.httpClient.get('/files');
    return response.data;
  }

  async downloadFile(fileName) {
    try {
      const response = await this.httpClient.get(`/file/${fileName}`);
      return response.data;
    } catch (error) {
      console.error(`Error downloading file ${fileName}:`, error.message);
      return null;
    }
  }

  parseCSVContent(csvContent) {
    try {
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        relax_column_count: true
      });

      return records.filter(record => {
        if (!record.file || !record.text || !record.number || !record.hex) {
          return false;
        }

        const num = parseInt(record.number);
        if (isNaN(num)) {
          return false;
        }

        if (record.hex.length !== 32) {
          return false;
        }

        return true;
      }).map(record => ({
        text: record.text,
        number: parseInt(record.number),
        hex: record.hex
      }));
    } catch (error) {
      console.error('Error parsing CSV:', error);
      return [];
    }
  }

  async getProcessedFiles(fileName = null) {
    const { files } = await this.getFilesList();
    const filesToProcess = fileName ? [fileName] : files;
    const processedFiles = [];

    for (const file of filesToProcess) {
      const content = await this.downloadFile(file);
      if (content) {
        const lines = this.parseCSVContent(content);
        if (lines.length > 0) {
          processedFiles.push({
            file,
            lines
          });
        }
      }
    }

    return processedFiles;
  }
}

export const fileService = new FileService();
import { expect } from 'chai';
import { FileService } from '../src/services/fileService.js';

describe('File Service', () => {
  describe('parseCSVContent', () => {
    let service;

    beforeEach(() => {
      service = new FileService();
    });

    it('should parse valid CSV content correctly', () => {
      const csvContent = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765`;
      
      const result = service.parseCSVContent(csvContent);
      
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
      expect(result[0]).to.deep.equal({
        text: 'RgTya',
        number: 64075909,
        hex: '70ad29aacf0b690b0467fe2b2767f765'
      });
    });

    it('should filter out invalid records', () => {
      const csvContent = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
file1.csv,Invalid,NotANumber,short
file1.csv,Missing,123
file1.csv,Complete,123,70ad29aacf0b690b0467fe2b2767f765`;
      
      const result = service.parseCSVContent(csvContent);
      expect(result).to.have.lengthOf(2);
    });
  });

  describe('getProcessedFiles', () => {
    it('should process multiple files correctly', async () => {
      const mockHttpClient = {
        get: async (path) => {
          if (path === '/files') {
            return { data: { files: ['file1.csv', 'file2.csv'] } };
          }
          return { 
            data: 'file,text,number,hex\nfile1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765'
          };
        }
      };

      const service = new FileService(mockHttpClient);
      const result = await service.getProcessedFiles();

      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.have.property('file');
      expect(result[0]).to.have.property('lines');
      expect(result[0].lines).to.be.an('array');
    });

    it('should handle file download errors gracefully', async () => {
      const mockHttpClient = {
        get: async (path) => {
          if (path === '/files') {
            return { data: { files: ['file1.csv'] } };
          }
          throw new Error('Download failed');
        }
      };

      const service = new FileService(mockHttpClient);
      const result = await service.getProcessedFiles();

      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(0);
    });
  });
});
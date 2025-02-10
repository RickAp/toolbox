import express from 'express';
import { fileService } from '../services/fileService.js';

const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const { fileName } = req.query;
    const data = await fileService.getProcessedFiles(fileName);
    res.json(data);
  } catch (error) {
    console.error('Error processing files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/list', async (req, res) => {
  try {
    const filesList = await fileService.getFilesList();
    res.json(filesList);
  } catch (error) {
    console.error('Error getting files list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
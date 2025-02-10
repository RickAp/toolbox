import express from 'express'
import cors from 'cors'
import { PORT } from './config/constants.js'
import fileRoutes from './routes/fileRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', fileRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

export default app
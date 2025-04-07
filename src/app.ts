import express, { Request, Response } from 'express'
import cors from 'cors'
import { ProjectRoutes } from './app/modules/projects/projects.route';
const app = express()


// parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1/projects', ProjectRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app;
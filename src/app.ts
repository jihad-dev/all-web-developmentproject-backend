import express, { Request, Response } from 'express'
import cors from 'cors'
import { ProjectRoutes } from './app/modules/projects/projects.route';
import { AdminRoutes } from './app/modules/admin/admin.route';
const app = express()


// parsers
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true,
}));

app.use('/api/v1/projects', ProjectRoutes);
app.use('/api/v1/admin', AdminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app;
import express, { Request, Response } from 'express';
import cors from 'cors';
import { ProjectRoutes } from './app/modules/projects/projects.route';
import { AdminRoutes } from './app/modules/admin/admin.route';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://all-projects-web-development-backend.vercel.app',
  'https://jihad-portfolio.vercel.app',
];

// CORS Middleware Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV !== 'production'
      ) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
  })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1/projects', ProjectRoutes);
app.use('/api/v1/admin', AdminRoutes);

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Portfolio Backend API',
  });
});

export default app;
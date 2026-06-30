import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase, db } from './db.js';
import router from './routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // For local dev flexibility
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Main DB Connect
connectDatabase().then(() => {
  // Routes
  app.use('/api', router);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'OK',
      database: db.isMock() ? 'Local JSON File DB Fallback' : 'MongoDB'
    });
  });

  // Start Server
  app.listen(PORT, () => {
    console.log(`🚀 Portfolio backend server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database connection:', err);
  process.exit(1);
});

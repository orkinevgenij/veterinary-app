import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import apointmentRoutes from './routes/apointmentRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import cors from 'cors';
const port = process.env.PORT || 5001;

connectDB();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.send('Api is running');
});
app.use('/api/users', userRoutes);
app.use('/api/apointments', apointmentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

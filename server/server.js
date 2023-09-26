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
import nodemailer from 'nodemailer';
const port = process.env.PORT || 5001;

connectDB();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// const transporter = nodemailer.createTransport({
//   port: 587,
//   host: 'smtp.gmail.com',
//   secure: false,
//   auth: {
//     user: 'orkinevgenij@gmail.com',
//     pass: 'aizawgguforyufhn',
//   },
// });

// app.post('/text-mail', (req, res) => {
//   const { name, animal, description, number, date } = req.body;
//   const mailData = {
//     from: `${name} orkinevgenij@gmail.com`,
//     to: 'orkinevgenij@gmail.com',
//     subject: 'Ветеринарная клиника',
//     text: 'Hello world',
//     html: `<p>Имя клиента: ${name}</p>
//     <br/>
//     <p>Телефон: ${number}</p>
//     <br/>
//     <p>Животное: ${animal}</p>
//     <br/>
//     <p>Описание: ${description}</p>
//     <br/>
//     <p>Желаемая дата визита: ${date}</p>`,
//   };
//   transporter.sendMail(mailData, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     res.status(200).send({ message: 'Mail send', message_id: info.messageId });
//   });
// });
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

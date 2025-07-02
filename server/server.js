import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js'; // Assuming you have a connection file for your database 

import userRouter from './routes/userRoutes.js'; // Importing user routes 
import imagerouter from './routes/imageRoutes.js'; // Importing image routes
const Port = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());
await connectDB(); // Connect to MongoDB

app.use('/api/users', userRouter); // Use user routes
app.use('/api/images', imagerouter); // Use image routes

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
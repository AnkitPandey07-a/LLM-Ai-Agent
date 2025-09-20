
import express from 'express';
import dotenv from 'dotenv';
import chatRoute from './routes/chatRoute.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend Running');
});

// Route for chat
app.use('/api', chatRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on PORT no ${PORT}`);
});


import express from 'express';
import dotenv from 'dotenv'
import chatRoute from './routes/chatRoute.js';
import cors from 'cors';
dotenv.config();

const app = express();

const PORT = process.env.PORT ;

app.use(
  cors({
    origin: "*",
     methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:['Content-Type']
  })
);


app.use(express.json())
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use('/api', chatRoute)



app.listen(PORT, () => {
  console.log(`Server is running on PORT no ${PORT}`);
});



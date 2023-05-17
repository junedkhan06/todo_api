import express from 'express';
import database from './data/database.js';
import userRouter from './routes/user.js';
import userTasks from './routes/tasks.js';
import { errorMiddware } from './middlewares/error.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

config({
    path: './data/config.env'
})

database();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use('/api/v1/tasks', userTasks);
app.use('/api/v1/users', userRouter);



app.get('/', (req, res) => {
    res.send("Home")
});

app.use(errorMiddware)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
  });
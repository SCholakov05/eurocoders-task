import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
// import usersRouter from './routes/users.js';
import cookieParser from 'cookie-parser';


const app = express();
const port = 8800;

// If there is an auth problem
// ALTER USER 'root'@localhost' IDENTIFIED WITH mysql_native_password BY '12345'

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/auth', authRouter);
// app.use('/api/users', usersRouter);

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
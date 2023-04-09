import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import photosRoutes from './routes/photos.js';
import usersRoutes from './routes/users.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();
const port = 8800;

// If there is an auth problem
// ALTER USER 'root'@localhost' IDENTIFIED WITH mysql_native_password BY '12345'

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single('file'), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/photos", photosRoutes);
app.use("/api/users", usersRoutes);

  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  });
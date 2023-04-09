import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import photosRoutes from './routes/photos.js';
import usersRoutes from './routes/users.js';
import commentsRoutes from './routes/comments.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();
const port = 8800;

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
app.use("/api/comments", commentsRoutes);

  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  });
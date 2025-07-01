import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import postsRoutes from './routes/postsRoutes.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world from clean backend ✨');
});
app.use("/api/posts",postsRoutes )


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import express from 'express';
import bodyParser from 'body-parser';
import AuthRouter from '@/routes/authRoutes';
import PostRouter from '@/routes/postRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', AuthRouter);
app.use('/posts', PostRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

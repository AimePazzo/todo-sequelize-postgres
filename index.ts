import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './src/routers';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Router
app.use('/api', router);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to todo app with PostgreSQL 🥳');
});

// Synchronize the database and start the server
const startServer = async () => {
  try {

    app.listen(4000, () => {
      console.log('Server is running on http://localhost:4000 👻!');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

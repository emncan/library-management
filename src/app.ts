import 'express-async-errors';
import express, { Application } from 'express';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import { syncDatabase } from './models/index';

import { errorHandler } from './middleware/errorHandler';

const app: Application = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.use(errorHandler);

const startServer = async () => {
    try {
        syncDatabase();
        console.log('Database synced!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

startServer();


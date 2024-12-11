import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
});

sequelize.authenticate()
    .then(() => logger.info('Database connected successfully.'))
    .catch((err) => logger.error('Database connection error:', err));

export default sequelize;

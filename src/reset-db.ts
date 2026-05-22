import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './users/entities/user.entity';

// Load .env configuration
config();

async function resetDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  let dataSourceOptions: any;

  if (databaseUrl) {
    const isLocalhost = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');
    dataSourceOptions = {
      type: 'postgres',
      url: databaseUrl,
      entities: [User],
      ssl: isLocalhost ? false : { rejectUnauthorized: false },
    };
  } else {
    dataSourceOptions = {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'goalgrow',
      entities: [User],
    };
  }

  const dataSource = new DataSource(dataSourceOptions);

  try {
    console.log('🔄 Connecting to the database to reset...');
    await dataSource.initialize();
    
    console.log('⚠️ Dropping all existing tables...');
    await dataSource.dropDatabase();
    console.log('✅ All tables successfully dropped! Database is now clean.');
    
  } catch (error) {
    console.error('❌ Failed to reset database:', error.message);
    process.exit(1);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

resetDatabase();

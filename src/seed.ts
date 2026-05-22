import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { User } from './users/entities/user.entity';
import { Role } from './users/enums/role.enum';

// Load .env from backend root
config();

const seedUsers = [
  {
    email: 'admin@goalgrow.com',
    password: 'Password@123',
    fullName: 'System Administrator',
    phone: '+250788000001',
    address: 'Kigali, Rwanda',
    role: Role.Admin,
  },
  {
    email: 'manager@goalgrow.com',
    password: 'Password@123',
    fullName: 'Competition Manager',
    phone: '+250788000002',
    address: 'Kigali, Rwanda',
    role: Role.Manager,
  },
  {
    email: 'sponsor@goalgrow.com',
    password: 'Password@123',
    fullName: 'Gold Sponsor',
    phone: '+250788000003',
    address: 'Kigali, Rwanda',
    role: Role.Sponsor,
  },
  {
    email: 'player1@goalgrow.com',
    password: 'Password@123',
    fullName: 'Jean Pierre Habimana',
    phone: '+250788000004',
    address: 'Huye, Rwanda',
    role: Role.Player,
  },
  {
    email: 'player2@goalgrow.com',
    password: 'Password@123',
    fullName: 'Alice Uwimana',
    phone: '+250788000005',
    address: 'Musanze, Rwanda',
    role: Role.Player,
  },
  {
    email: 'user1@goalgrow.com',
    password: 'Password@123',
    fullName: 'Eric Ndayisaba',
    phone: '+250788000006',
    address: 'Rubavu, Rwanda',
    role: Role.User,
  },
  {
    email: 'user2@goalgrow.com',
    password: 'Password@123',
    fullName: 'Grace Mukamana',
    phone: '+250788000007',
    address: 'Gisenyi, Rwanda',
    role: Role.User,
  },
];

async function seed() {
  // Build connection options from env (mirrors app.module.ts logic)
  const databaseUrl = process.env.DATABASE_URL;

  let dataSourceOptions: any;

  if (databaseUrl) {
    const isLocalhost = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');
    dataSourceOptions = {
      type: 'postgres',
      url: databaseUrl,
      entities: [User],
      synchronize: true,
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
      synchronize: true,
    };
  }

  const dataSource = new DataSource(dataSourceOptions);

  try {
    await dataSource.initialize();
    console.log('✅ Database connected successfully!\n');

    const userRepo = dataSource.getRepository(User);

    for (const userData of seedUsers) {
      const existing = await userRepo.findOne({ where: { email: userData.email } });

      if (existing) {
        console.log(`⏭️  Skipping "${userData.email}" (already exists) — Role: ${userData.role}`);
        continue;
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(userData.password, salt);

      const user = userRepo.create({
        email: userData.email,
        passwordHash,
        fullName: userData.fullName,
        phone: userData.phone,
        address: userData.address,
        role: userData.role,
      });

      await userRepo.save(user);
      console.log(`✅ Created "${userData.email}" — Role: ${userData.role}`);
    }

    console.log('\n🎉 Seeding completed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('All users have password: Password@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

seed();

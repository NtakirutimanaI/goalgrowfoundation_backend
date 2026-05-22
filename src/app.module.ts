import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { RewardsModule } from './rewards/rewards.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { CmsModule } from './cms/cms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('DATABASE_URL');
        if (url) {
          const isLocalhost = url.includes('localhost') || url.includes('127.0.0.1');
          return {
            type: 'postgres',
            url,
            autoLoadEntities: true,
            synchronize: true, // Only for development/prototype database migrations!
            ssl: isLocalhost ? false : { rejectUnauthorized: false },
          };
        }
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USER', 'postgres'),
          password: configService.get<string>('DB_PASSWORD', 'postgres'),
          database: configService.get<string>('DB_NAME', 'goalgrow'),
          autoLoadEntities: true,
          synchronize: true, // Only for development!
        };
      },
    }),
    UsersModule,
    AuthModule,
    ProfilesModule,
    CompetitionsModule,
    RewardsModule,
    CloudinaryModule,
    RegistrationsModule,
    CmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

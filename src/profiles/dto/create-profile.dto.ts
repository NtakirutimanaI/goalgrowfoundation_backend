import { IsString, IsOptional, IsDateString, IsObject } from 'class-validator';

export class CreatePlayerProfileDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsObject()
  parentInfo?: {
    name: string;
    phone: string;
    email: string;
  };

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}

export class CreateSponsorProfileDto {
  @IsString()
  companyName: string;

  @IsString()
  contactPerson: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

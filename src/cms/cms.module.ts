import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { CmsContent } from './entities/cms-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CmsContent])],
  controllers: [CmsController],
  providers: [CmsService],
  exports: [CmsService],
})
export class CmsModule {}

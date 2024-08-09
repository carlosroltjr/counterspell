import { Module } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { SaveDataController } from './saveData.controller'
import { SaveDataService } from './saveData.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [SaveDataController],
  providers: [SaveDataService, PrismaService]
})
export class SaveDataModule {}

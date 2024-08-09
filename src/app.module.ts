import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PlayerModule } from './resources/player/player.module'
import { SaveDataModule } from './resources/saveData/saveData.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), PlayerModule, SaveDataModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

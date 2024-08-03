import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PlayerModule } from './resources/player/player.module'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

import { Injectable } from '@nestjs/common'
import { PlayerService } from '../player/player.service'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class CounterService {
  constructor (private playerservice: PlayerService,
    private httpService: HttpService
  ) {}

  async findCounter (heroName: string, playerId: string) {
    const player = this.playerservice.findPlayer({ id: Number(playerId) })
    return player
  }

  async findHeroByName (name: string) {
    return this.httpService.get(process.env.FIND_HERO_URL, {})
  }
}

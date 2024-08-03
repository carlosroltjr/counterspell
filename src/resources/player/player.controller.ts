import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreatePlayerDto } from '../../dtos/createPlayerDto'
import { PlayerService } from './player.service'
import { Player } from '@prisma/client'

@Controller('player')
export class PlayerController {
  constructor (private readonly playerService: PlayerService) {}

  @Post()
  async createPlayer (@Body() createPlayerDto: CreatePlayerDto): Promise<CreatePlayerDto> {
    return this.playerService.createPlayer(createPlayerDto)
  }

  @Get(':id')
  async getPlayer (@Param('id') id: string) {
    return this.playerService.findPlayer({ id: Number(id) })
  }

  @Put(':id')
  async updatePlayer (@Param('id') id: string, @Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.updatePlayer({
      where: { id: Number(id) },
      data: createPlayerDto
    })
  }

  @Delete(':id')
  async deletePlayer (@Param('id') id: string): Promise<Player> {
    return this.playerService.deletePlayer({ id: Number(id) })
  }
}

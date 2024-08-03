import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { Player, Prisma } from '@prisma/client'

@Injectable()
export class PlayerService {
  constructor (private prisma: PrismaService) {}

  async findPlayer (
    playerWhereUniqueInput: Prisma.PlayerWhereUniqueInput
  ): Promise<Player | null> {
    return this.prisma.player.findUnique({
      where: playerWhereUniqueInput
    })
  }

  async createPlayer (data: Prisma.PlayerCreateInput): Promise<Player> {
    return this.prisma.player.create({
      data
    })
  }

  async updatePlayer (params: {
    where: Prisma.PlayerWhereUniqueInput;
    data: Prisma.PlayerUpdateInput;
  }): Promise<Player> {
    const { where, data } = params
    return this.prisma.player.update({
      data,
      where
    })
  }

  async deletePlayer (where: Prisma.PlayerWhereUniqueInput): Promise<Player> {
    return this.prisma.player.delete({
      where
    })
  }
}

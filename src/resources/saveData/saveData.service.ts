import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { Matches } from '@prisma/client'

@Injectable()
export class SaveDataService {
  constructor (private httpService: HttpService,
    private prisma: PrismaService
  ) {}

  async saveMatches (): Promise<Matches> {
    const myLatestMatches = await this.prisma.matches.findMany({
      orderBy: {
        id: 'desc'
      },
      take: 1
    })
    let lowestMatchId: string = myLatestMatches.length === 0 ? process.env.POSITIVE_INFINITY : myLatestMatches[0].lowestMatchId
    const openDotaMatches = await this.httpService.axiosRef.get(process.env.OPEN_DOTA_BASE_URL + '/publicMatches',
      { params: { less_than_match_id: lowestMatchId } })

    openDotaMatches.data.forEach((match: { match_id: number }) => {
      if (lowestMatchId > match.match_id.toString()) {
        lowestMatchId = match.match_id.toString()
      }
    })

    return this.prisma.matches.create({
      data: {
        data: openDotaMatches.data,
        lowestMatchId
      }
    })
  }
}

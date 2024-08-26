import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from './database/prisma.service'

@Injectable()
export class AppService {
  constructor (private httpService: HttpService,
    private prisma: PrismaService
  ) {}

  private readonly logger = new Logger(AppService.name)
  private readonly maxRequestsPerDay = 20000

  getHello (): string {
    return 'Hello World!'
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async getMatches () {
    this.logger.debug('Starting matches data gathering...')
    let remainingRequests = this.maxRequestsPerDay
    let lowestMatchId = Number(process.env.VERY_BIG_NUMBER)
    while (remainingRequests > 0) {
      const openDotaMatches = await this.httpService.axiosRef.get(
        process.env.OPEN_DOTA_BASE_URL + '/publicMatches',
        { params: { less_than_match_id: lowestMatchId } }
      )

      openDotaMatches.data.forEach((match: { match_id: number }) => {
        if (lowestMatchId > match.match_id) {
          lowestMatchId = match.match_id
        }
      })

      this.logger.debug('Saving matches...')
      await this.prisma.matches.create({
        data: {
          data: openDotaMatches.data
        }
      })

      remainingRequests--
      this.logger.debug(`Remaining requests: ${remainingRequests}.`)
      await new Promise<void>(resolve => setTimeout(() => resolve(), 5000))
    }
  }
}

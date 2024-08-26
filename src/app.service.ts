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
  private readonly maxRequestsPerDay: number = 2000
  private startingMatchIdValue: number

  getHello (): string {
    return 'Hello World!'
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async saveMatches () {
    this.logger.log('Starting data extract stage...')
    let remainingRequests = this.maxRequestsPerDay
    let lowestMatchId = this.startingMatchIdValue || 999999999999
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

      await this.prisma.matches.create({
        data: { data: openDotaMatches.data }
      }).then(matches => {
        this.logger.log(`Saved matches[] with id ${matches.id} to database...`)
      })

      remainingRequests--
      this.logger.debug(`Remaining requests: ${remainingRequests}.`)
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000))
    }
    this.startingMatchIdValue = lowestMatchId
  }
}

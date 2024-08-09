import { Controller, Post } from '@nestjs/common'
import { SaveDataService } from './saveData.service'

@Controller('save-data')
export class SaveDataController {
  constructor (private saveDataService: SaveDataService) {}

  @Post()
  async savaMatches () {
    return await this.saveDataService.saveMatches()
  }
}

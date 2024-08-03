import { IsNotEmpty } from 'class-validator'

export class CreatePlayerDto {
  @IsNotEmpty()
    name: string

  @IsNotEmpty()
    mainRole: string

  @IsNotEmpty()
    mainHeroes: string[]
}

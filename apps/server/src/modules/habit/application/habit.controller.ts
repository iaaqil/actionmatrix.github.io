import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Habit, HabitDomainFacade } from '@server/modules/habit/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { HabitApplicationEvent } from './habit.application.event'
import { HabitCreateDto, HabitUpdateDto } from './habit.dto'

@Controller('/v1/habits')
export class HabitController {
  constructor(
    private eventService: EventService,
    private habitDomainFacade: HabitDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.habitDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: HabitCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.habitDomainFacade.create(body)

    await this.eventService.emit<HabitApplicationEvent.HabitCreated.Payload>(
      HabitApplicationEvent.HabitCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:habitId')
  async findOne(@Param('habitId') habitId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.habitDomainFacade.findOneByIdOrFail(
      habitId,
      queryOptions,
    )

    return item
  }

  @Patch('/:habitId')
  async update(
    @Param('habitId') habitId: string,
    @Body() body: HabitUpdateDto,
  ) {
    const item = await this.habitDomainFacade.findOneByIdOrFail(habitId)

    const itemUpdated = await this.habitDomainFacade.update(
      item,
      body as Partial<Habit>,
    )
    return itemUpdated
  }

  @Delete('/:habitId')
  async delete(@Param('habitId') habitId: string) {
    const item = await this.habitDomainFacade.findOneByIdOrFail(habitId)

    await this.habitDomainFacade.delete(item)

    return item
  }
}

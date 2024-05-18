import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { HabitDomainFacade } from '@server/modules/habit/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { HabitApplicationEvent } from './habit.application.event'
import { HabitCreateDto } from './habit.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class HabitByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private habitDomainFacade: HabitDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/habits')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.habitDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/habits')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: HabitCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.habitDomainFacade.create(valuesUpdated)

    await this.eventService.emit<HabitApplicationEvent.HabitCreated.Payload>(
      HabitApplicationEvent.HabitCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

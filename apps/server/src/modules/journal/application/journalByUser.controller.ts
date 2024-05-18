import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { JournalDomainFacade } from '@server/modules/journal/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { JournalApplicationEvent } from './journal.application.event'
import { JournalCreateDto } from './journal.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class JournalByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private journalDomainFacade: JournalDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/journals')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.journalDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/journals')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: JournalCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.journalDomainFacade.create(valuesUpdated)

    await this.eventService.emit<JournalApplicationEvent.JournalCreated.Payload>(
      JournalApplicationEvent.JournalCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

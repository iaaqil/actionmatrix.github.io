import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { HostviewDomainFacade } from '@server/modules/hostview/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { HostviewApplicationEvent } from './hostview.application.event'
import { HostviewCreateDto } from './hostview.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class HostviewByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private hostviewDomainFacade: HostviewDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/hostviews')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.hostviewDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/hostviews')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: HostviewCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.hostviewDomainFacade.create(valuesUpdated)

    await this.eventService.emit<HostviewApplicationEvent.HostviewCreated.Payload>(
      HostviewApplicationEvent.HostviewCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

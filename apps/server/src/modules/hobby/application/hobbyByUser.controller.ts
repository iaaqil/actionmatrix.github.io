import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { HobbyDomainFacade } from '@server/modules/hobby/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { HobbyApplicationEvent } from './hobby.application.event'
import { HobbyCreateDto } from './hobby.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class HobbyByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private hobbyDomainFacade: HobbyDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/hobbys')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.hobbyDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/hobbys')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: HobbyCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.hobbyDomainFacade.create(valuesUpdated)

    await this.eventService.emit<HobbyApplicationEvent.HobbyCreated.Payload>(
      HobbyApplicationEvent.HobbyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

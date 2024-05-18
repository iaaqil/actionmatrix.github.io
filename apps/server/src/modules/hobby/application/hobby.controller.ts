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
import { Hobby, HobbyDomainFacade } from '@server/modules/hobby/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { HobbyApplicationEvent } from './hobby.application.event'
import { HobbyCreateDto, HobbyUpdateDto } from './hobby.dto'

@Controller('/v1/hobbys')
export class HobbyController {
  constructor(
    private eventService: EventService,
    private hobbyDomainFacade: HobbyDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.hobbyDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: HobbyCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.hobbyDomainFacade.create(body)

    await this.eventService.emit<HobbyApplicationEvent.HobbyCreated.Payload>(
      HobbyApplicationEvent.HobbyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:hobbyId')
  async findOne(@Param('hobbyId') hobbyId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.hobbyDomainFacade.findOneByIdOrFail(
      hobbyId,
      queryOptions,
    )

    return item
  }

  @Patch('/:hobbyId')
  async update(
    @Param('hobbyId') hobbyId: string,
    @Body() body: HobbyUpdateDto,
  ) {
    const item = await this.hobbyDomainFacade.findOneByIdOrFail(hobbyId)

    const itemUpdated = await this.hobbyDomainFacade.update(
      item,
      body as Partial<Hobby>,
    )
    return itemUpdated
  }

  @Delete('/:hobbyId')
  async delete(@Param('hobbyId') hobbyId: string) {
    const item = await this.hobbyDomainFacade.findOneByIdOrFail(hobbyId)

    await this.hobbyDomainFacade.delete(item)

    return item
  }
}

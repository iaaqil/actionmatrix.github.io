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
import { Hostview, HostviewDomainFacade } from '@server/modules/hostview/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { HostviewApplicationEvent } from './hostview.application.event'
import { HostviewCreateDto, HostviewUpdateDto } from './hostview.dto'

@Controller('/v1/hostviews')
export class HostviewController {
  constructor(
    private eventService: EventService,
    private hostviewDomainFacade: HostviewDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.hostviewDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: HostviewCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.hostviewDomainFacade.create(body)

    await this.eventService.emit<HostviewApplicationEvent.HostviewCreated.Payload>(
      HostviewApplicationEvent.HostviewCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:hostviewId')
  async findOne(
    @Param('hostviewId') hostviewId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.hostviewDomainFacade.findOneByIdOrFail(
      hostviewId,
      queryOptions,
    )

    return item
  }

  @Patch('/:hostviewId')
  async update(
    @Param('hostviewId') hostviewId: string,
    @Body() body: HostviewUpdateDto,
  ) {
    const item = await this.hostviewDomainFacade.findOneByIdOrFail(hostviewId)

    const itemUpdated = await this.hostviewDomainFacade.update(
      item,
      body as Partial<Hostview>,
    )
    return itemUpdated
  }

  @Delete('/:hostviewId')
  async delete(@Param('hostviewId') hostviewId: string) {
    const item = await this.hostviewDomainFacade.findOneByIdOrFail(hostviewId)

    await this.hostviewDomainFacade.delete(item)

    return item
  }
}

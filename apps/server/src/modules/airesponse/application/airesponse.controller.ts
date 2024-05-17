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
import {
  Airesponse,
  AiresponseDomainFacade,
} from '@server/modules/airesponse/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AiresponseApplicationEvent } from './airesponse.application.event'
import { AiresponseCreateDto, AiresponseUpdateDto } from './airesponse.dto'

@Controller('/v1/airesponses')
export class AiresponseController {
  constructor(
    private eventService: EventService,
    private airesponseDomainFacade: AiresponseDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.airesponseDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AiresponseCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.airesponseDomainFacade.create(body)

    await this.eventService.emit<AiresponseApplicationEvent.AiresponseCreated.Payload>(
      AiresponseApplicationEvent.AiresponseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:airesponseId')
  async findOne(
    @Param('airesponseId') airesponseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.airesponseDomainFacade.findOneByIdOrFail(
      airesponseId,
      queryOptions,
    )

    return item
  }

  @Patch('/:airesponseId')
  async update(
    @Param('airesponseId') airesponseId: string,
    @Body() body: AiresponseUpdateDto,
  ) {
    const item =
      await this.airesponseDomainFacade.findOneByIdOrFail(airesponseId)

    const itemUpdated = await this.airesponseDomainFacade.update(
      item,
      body as Partial<Airesponse>,
    )
    return itemUpdated
  }

  @Delete('/:airesponseId')
  async delete(@Param('airesponseId') airesponseId: string) {
    const item =
      await this.airesponseDomainFacade.findOneByIdOrFail(airesponseId)

    await this.airesponseDomainFacade.delete(item)

    return item
  }
}

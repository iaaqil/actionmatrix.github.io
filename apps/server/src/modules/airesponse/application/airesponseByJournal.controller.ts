import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AiresponseDomainFacade } from '@server/modules/airesponse/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AiresponseApplicationEvent } from './airesponse.application.event'
import { AiresponseCreateDto } from './airesponse.dto'

import { JournalDomainFacade } from '../../journal/domain'

@Controller('/v1/journals')
export class AiresponseByJournalController {
  constructor(
    private journalDomainFacade: JournalDomainFacade,

    private airesponseDomainFacade: AiresponseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/journal/:journalId/airesponses')
  async findManyJournalId(
    @Param('journalId') journalId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.journalDomainFacade.findOneByIdOrFail(journalId)

    const items = await this.airesponseDomainFacade.findManyByJournal(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/journal/:journalId/airesponses')
  async createByJournalId(
    @Param('journalId') journalId: string,
    @Body() body: AiresponseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, journalId }

    const item = await this.airesponseDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AiresponseApplicationEvent.AiresponseCreated.Payload>(
      AiresponseApplicationEvent.AiresponseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

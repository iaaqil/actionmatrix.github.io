import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TodoDomainFacade } from '@server/modules/todo/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TodoApplicationEvent } from './todo.application.event'
import { TodoCreateDto } from './todo.dto'

import { JournalDomainFacade } from '../../journal/domain'

@Controller('/v1/journals')
export class TodoByJournalController {
  constructor(
    private journalDomainFacade: JournalDomainFacade,

    private todoDomainFacade: TodoDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/journal/:journalId/todos')
  async findManyJournalId(
    @Param('journalId') journalId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.journalDomainFacade.findOneByIdOrFail(journalId)

    const items = await this.todoDomainFacade.findManyByJournal(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/journal/:journalId/todos')
  async createByJournalId(
    @Param('journalId') journalId: string,
    @Body() body: TodoCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, journalId }

    const item = await this.todoDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TodoApplicationEvent.TodoCreated.Payload>(
      TodoApplicationEvent.TodoCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

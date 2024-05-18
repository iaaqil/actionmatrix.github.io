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
import { Journal, JournalDomainFacade } from '@server/modules/journal/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { JournalApplicationEvent } from './journal.application.event'
import { JournalCreateDto, JournalUpdateDto } from './journal.dto'

@Controller('/v1/journals')
export class JournalController {
  constructor(
    private eventService: EventService,
    private journalDomainFacade: JournalDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.journalDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: JournalCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.journalDomainFacade.create(body)

    await this.eventService.emit<JournalApplicationEvent.JournalCreated.Payload>(
      JournalApplicationEvent.JournalCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:journalId')
  async findOne(
    @Param('journalId') journalId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.journalDomainFacade.findOneByIdOrFail(
      journalId,
      queryOptions,
    )

    return item
  }

  @Patch('/:journalId')
  async update(
    @Param('journalId') journalId: string,
    @Body() body: JournalUpdateDto,
  ) {
    const item = await this.journalDomainFacade.findOneByIdOrFail(journalId)

    const itemUpdated = await this.journalDomainFacade.update(
      item,
      body as Partial<Journal>,
    )
    return itemUpdated
  }

  @Delete('/:journalId')
  async delete(@Param('journalId') journalId: string) {
    const item = await this.journalDomainFacade.findOneByIdOrFail(journalId)

    await this.journalDomainFacade.delete(item)

    return item
  }
}

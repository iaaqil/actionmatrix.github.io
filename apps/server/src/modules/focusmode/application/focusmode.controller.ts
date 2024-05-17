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
  Focusmode,
  FocusmodeDomainFacade,
} from '@server/modules/focusmode/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { FocusmodeApplicationEvent } from './focusmode.application.event'
import { FocusmodeCreateDto, FocusmodeUpdateDto } from './focusmode.dto'

@Controller('/v1/focusmodes')
export class FocusmodeController {
  constructor(
    private eventService: EventService,
    private focusmodeDomainFacade: FocusmodeDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.focusmodeDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: FocusmodeCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.focusmodeDomainFacade.create(body)

    await this.eventService.emit<FocusmodeApplicationEvent.FocusmodeCreated.Payload>(
      FocusmodeApplicationEvent.FocusmodeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:focusmodeId')
  async findOne(
    @Param('focusmodeId') focusmodeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.focusmodeDomainFacade.findOneByIdOrFail(
      focusmodeId,
      queryOptions,
    )

    return item
  }

  @Patch('/:focusmodeId')
  async update(
    @Param('focusmodeId') focusmodeId: string,
    @Body() body: FocusmodeUpdateDto,
  ) {
    const item = await this.focusmodeDomainFacade.findOneByIdOrFail(focusmodeId)

    const itemUpdated = await this.focusmodeDomainFacade.update(
      item,
      body as Partial<Focusmode>,
    )
    return itemUpdated
  }

  @Delete('/:focusmodeId')
  async delete(@Param('focusmodeId') focusmodeId: string) {
    const item = await this.focusmodeDomainFacade.findOneByIdOrFail(focusmodeId)

    await this.focusmodeDomainFacade.delete(item)

    return item
  }
}

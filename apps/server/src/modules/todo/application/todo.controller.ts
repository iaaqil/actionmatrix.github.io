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
import { Todo, TodoDomainFacade } from '@server/modules/todo/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TodoApplicationEvent } from './todo.application.event'
import { TodoCreateDto, TodoUpdateDto } from './todo.dto'

@Controller('/v1/todos')
export class TodoController {
  constructor(
    private eventService: EventService,
    private todoDomainFacade: TodoDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.todoDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TodoCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.todoDomainFacade.create(body)

    await this.eventService.emit<TodoApplicationEvent.TodoCreated.Payload>(
      TodoApplicationEvent.TodoCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:todoId')
  async findOne(@Param('todoId') todoId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.todoDomainFacade.findOneByIdOrFail(
      todoId,
      queryOptions,
    )

    return item
  }

  @Patch('/:todoId')
  async update(@Param('todoId') todoId: string, @Body() body: TodoUpdateDto) {
    const item = await this.todoDomainFacade.findOneByIdOrFail(todoId)

    const itemUpdated = await this.todoDomainFacade.update(
      item,
      body as Partial<Todo>,
    )
    return itemUpdated
  }

  @Delete('/:todoId')
  async delete(@Param('todoId') todoId: string) {
    const item = await this.todoDomainFacade.findOneByIdOrFail(todoId)

    await this.todoDomainFacade.delete(item)

    return item
  }
}

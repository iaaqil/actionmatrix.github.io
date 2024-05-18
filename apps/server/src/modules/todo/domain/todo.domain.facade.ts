import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Todo } from './todo.model'

import { Journal } from '../../journal/domain'

@Injectable()
export class TodoDomainFacade {
  constructor(
    @InjectRepository(Todo)
    private repository: Repository<Todo>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Todo>): Promise<Todo> {
    return this.repository.save(values)
  }

  async update(item: Todo, values: Partial<Todo>): Promise<Todo> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Todo): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Todo> = {},
  ): Promise<Todo[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Todo> = {},
  ): Promise<Todo> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByJournal(
    item: Journal,
    queryOptions: RequestHelper.QueryOptions<Todo> = {},
  ): Promise<Todo[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('journal')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        journalId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}

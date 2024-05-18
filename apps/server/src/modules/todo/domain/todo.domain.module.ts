import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TodoDomainFacade } from './todo.domain.facade'
import { Todo } from './todo.model'

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), DatabaseHelperModule],
  providers: [TodoDomainFacade, TodoDomainFacade],
  exports: [TodoDomainFacade],
})
export class TodoDomainModule {}

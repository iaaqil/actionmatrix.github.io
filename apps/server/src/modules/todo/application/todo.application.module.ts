import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TodoDomainModule } from '../domain'
import { TodoController } from './todo.controller'

import { JournalDomainModule } from '../../../modules/journal/domain'

import { TodoByJournalController } from './todoByJournal.controller'

@Module({
  imports: [AuthenticationDomainModule, TodoDomainModule, JournalDomainModule],
  controllers: [TodoController, TodoByJournalController],
  providers: [],
})
export class TodoApplicationModule {}

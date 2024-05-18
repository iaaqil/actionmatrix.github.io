import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { JournalDomainModule } from '../domain'
import { JournalController } from './journal.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { JournalByUserController } from './journalByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, JournalDomainModule, UserDomainModule],
  controllers: [JournalController, JournalByUserController],
  providers: [],
})
export class JournalApplicationModule {}

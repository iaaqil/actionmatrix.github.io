import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AiresponseDomainModule } from '../domain'
import { AiresponseController } from './airesponse.controller'

import { JournalDomainModule } from '../../../modules/journal/domain'

import { AiresponseByJournalController } from './airesponseByJournal.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    AiresponseDomainModule,

    JournalDomainModule,
  ],
  controllers: [AiresponseController, AiresponseByJournalController],
  providers: [],
})
export class AiresponseApplicationModule {}

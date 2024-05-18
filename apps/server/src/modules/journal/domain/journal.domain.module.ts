import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { JournalDomainFacade } from './journal.domain.facade'
import { Journal } from './journal.model'

@Module({
  imports: [TypeOrmModule.forFeature([Journal]), DatabaseHelperModule],
  providers: [JournalDomainFacade, JournalDomainFacade],
  exports: [JournalDomainFacade],
})
export class JournalDomainModule {}

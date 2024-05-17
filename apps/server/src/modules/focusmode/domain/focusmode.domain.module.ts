import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { FocusmodeDomainFacade } from './focusmode.domain.facade'
import { Focusmode } from './focusmode.model'

@Module({
  imports: [TypeOrmModule.forFeature([Focusmode]), DatabaseHelperModule],
  providers: [FocusmodeDomainFacade, FocusmodeDomainFacade],
  exports: [FocusmodeDomainFacade],
})
export class FocusmodeDomainModule {}

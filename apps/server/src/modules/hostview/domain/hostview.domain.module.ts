import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { HostviewDomainFacade } from './hostview.domain.facade'
import { Hostview } from './hostview.model'

@Module({
  imports: [TypeOrmModule.forFeature([Hostview]), DatabaseHelperModule],
  providers: [HostviewDomainFacade, HostviewDomainFacade],
  exports: [HostviewDomainFacade],
})
export class HostviewDomainModule {}

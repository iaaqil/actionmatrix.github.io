import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { HobbyDomainFacade } from './hobby.domain.facade'
import { Hobby } from './hobby.model'

@Module({
  imports: [TypeOrmModule.forFeature([Hobby]), DatabaseHelperModule],
  providers: [HobbyDomainFacade, HobbyDomainFacade],
  exports: [HobbyDomainFacade],
})
export class HobbyDomainModule {}

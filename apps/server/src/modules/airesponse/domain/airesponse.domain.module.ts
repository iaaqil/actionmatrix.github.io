import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AiresponseDomainFacade } from './airesponse.domain.facade'
import { Airesponse } from './airesponse.model'

@Module({
  imports: [TypeOrmModule.forFeature([Airesponse]), DatabaseHelperModule],
  providers: [AiresponseDomainFacade, AiresponseDomainFacade],
  exports: [AiresponseDomainFacade],
})
export class AiresponseDomainModule {}

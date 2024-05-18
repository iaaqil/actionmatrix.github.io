import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { HostviewDomainModule } from '../domain'
import { HostviewController } from './hostview.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { HostviewByUserController } from './hostviewByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, HostviewDomainModule, UserDomainModule],
  controllers: [HostviewController, HostviewByUserController],
  providers: [],
})
export class HostviewApplicationModule {}

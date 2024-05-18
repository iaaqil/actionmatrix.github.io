import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { HobbyDomainModule } from '../domain'
import { HobbyController } from './hobby.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { HobbyByUserController } from './hobbyByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, HobbyDomainModule, UserDomainModule],
  controllers: [HobbyController, HobbyByUserController],
  providers: [],
})
export class HobbyApplicationModule {}

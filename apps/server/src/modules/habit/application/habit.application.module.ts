import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { HabitDomainModule } from '../domain'
import { HabitController } from './habit.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { HabitByUserController } from './habitByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, HabitDomainModule, UserDomainModule],
  controllers: [HabitController, HabitByUserController],
  providers: [],
})
export class HabitApplicationModule {}

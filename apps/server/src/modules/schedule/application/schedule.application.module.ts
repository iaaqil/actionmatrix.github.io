import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ScheduleDomainModule } from '../domain'
import { ScheduleController } from './schedule.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ScheduleByUserController } from './scheduleByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, ScheduleDomainModule, UserDomainModule],
  controllers: [ScheduleController, ScheduleByUserController],
  providers: [],
})
export class ScheduleApplicationModule {}

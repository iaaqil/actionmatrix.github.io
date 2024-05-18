import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { JournalDomainModule } from './journal/domain'

import { TodoDomainModule } from './todo/domain'

import { GoalDomainModule } from './goal/domain'

import { HabitDomainModule } from './habit/domain'

import { HobbyDomainModule } from './hobby/domain'

import { ScheduleDomainModule } from './schedule/domain'

import { FocusmodeDomainModule } from './focusmode/domain'

import { AiresponseDomainModule } from './airesponse/domain'

import { HostviewDomainModule } from './hostview/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    JournalDomainModule,

    TodoDomainModule,

    GoalDomainModule,

    HabitDomainModule,

    HobbyDomainModule,

    ScheduleDomainModule,

    FocusmodeDomainModule,

    AiresponseDomainModule,

    HostviewDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}

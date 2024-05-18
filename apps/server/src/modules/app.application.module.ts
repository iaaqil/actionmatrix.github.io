import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { JournalApplicationModule } from './journal/application'

import { TodoApplicationModule } from './todo/application'

import { GoalApplicationModule } from './goal/application'

import { HabitApplicationModule } from './habit/application'

import { HobbyApplicationModule } from './hobby/application'

import { ScheduleApplicationModule } from './schedule/application'

import { FocusmodeApplicationModule } from './focusmode/application'

import { AiresponseApplicationModule } from './airesponse/application'

import { HostviewApplicationModule } from './hostview/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    JournalApplicationModule,

    TodoApplicationModule,

    GoalApplicationModule,

    HabitApplicationModule,

    HobbyApplicationModule,

    ScheduleApplicationModule,

    FocusmodeApplicationModule,

    AiresponseApplicationModule,

    HostviewApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}

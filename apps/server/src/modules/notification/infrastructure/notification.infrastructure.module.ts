import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationJournalSubscriber } from './subscribers/notification.journal.subscriber'

import { NotificationTodoSubscriber } from './subscribers/notification.todo.subscriber'

import { NotificationGoalSubscriber } from './subscribers/notification.goal.subscriber'

import { NotificationHabitSubscriber } from './subscribers/notification.habit.subscriber'

import { NotificationHobbySubscriber } from './subscribers/notification.hobby.subscriber'

import { NotificationScheduleSubscriber } from './subscribers/notification.schedule.subscriber'

import { NotificationFocusmodeSubscriber } from './subscribers/notification.focusmode.subscriber'

import { NotificationAiresponseSubscriber } from './subscribers/notification.airesponse.subscriber'

import { NotificationHostviewSubscriber } from './subscribers/notification.hostview.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationJournalSubscriber,

    NotificationTodoSubscriber,

    NotificationGoalSubscriber,

    NotificationHabitSubscriber,

    NotificationHobbySubscriber,

    NotificationScheduleSubscriber,

    NotificationFocusmodeSubscriber,

    NotificationAiresponseSubscriber,

    NotificationHostviewSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { HabitDomainFacade } from './habit.domain.facade'
import { Habit } from './habit.model'

@Module({
  imports: [TypeOrmModule.forFeature([Habit]), DatabaseHelperModule],
  providers: [HabitDomainFacade, HabitDomainFacade],
  exports: [HabitDomainFacade],
})
export class HabitDomainModule {}

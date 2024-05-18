import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Notification } from '../../../modules/notification/domain'

import { Journal } from '../../../modules/journal/domain'

import { Goal } from '../../../modules/goal/domain'

import { Habit } from '../../../modules/habit/domain'

import { Hobby } from '../../../modules/hobby/domain'

import { Schedule } from '../../../modules/schedule/domain'

import { Focusmode } from '../../../modules/focusmode/domain'

import { Hostview } from '../../../modules/hostview/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true, unique: true })
  email?: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ nullable: true, select: false })
  password: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Journal, child => child.user)
  journals?: Journal[]

  @OneToMany(() => Goal, child => child.user)
  goals?: Goal[]

  @OneToMany(() => Habit, child => child.user)
  habits?: Habit[]

  @OneToMany(() => Hobby, child => child.user)
  hobbys?: Hobby[]

  @OneToMany(() => Schedule, child => child.user)
  schedules?: Schedule[]

  @OneToMany(() => Focusmode, child => child.user)
  focusmodes?: Focusmode[]

  @OneToMany(() => Hostview, child => child.user)
  hostviews?: Hostview[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

import { ColumnNumeric } from '@server/core/database'
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

import { User } from '../../../modules/user/domain'

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  date?: string

  @Column({ nullable: true })
  time?: string

  @Column({ nullable: true })
  activity?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.schedules)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

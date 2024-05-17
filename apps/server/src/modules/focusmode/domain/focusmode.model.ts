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
export class Focusmode {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  startTime?: string

  @Column({ nullable: true })
  duration?: string

  @Column({ nullable: true })
  lowPowerModeFlag?: boolean

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.focusmodes)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

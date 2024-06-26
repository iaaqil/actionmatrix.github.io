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
export class Hostview {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  viewType?: string

  @Column({ nullable: true })
  viewDate?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.hostviews)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

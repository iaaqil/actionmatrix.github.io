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

import { Todo } from '../../../modules/todo/domain'

import { Airesponse } from '../../../modules/airesponse/domain'

@Entity()
export class Journal {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  title?: string

  @Column({ nullable: true })
  content?: string

  @Column({ nullable: true })
  likeDislikeFlag?: boolean

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.journals)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Todo, child => child.journal)
  todos?: Todo[]

  @OneToMany(() => Airesponse, child => child.journal)
  airesponses?: Airesponse[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

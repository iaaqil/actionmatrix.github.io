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

import { Journal } from '../../../modules/journal/domain'

@Entity()
export class Airesponse {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  responseText?: string

  @Column({})
  journalId: string

  @ManyToOne(() => Journal, parent => parent.airesponses)
  @JoinColumn({ name: 'journalId' })
  journal?: Journal

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

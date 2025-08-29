import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Location } from './location.entity'
import { User } from './user.entity'

@Entity()
export class TravelPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({ nullable: true })
  description: string

  @Column()
  startDate: string

  @Column()
  endDate: string

  @Column()
  duration: number

  @Column()
  participants: number

  @Column({ default: 0 })
  likes: number

  @OneToMany(() => Location, location => location.travelPlan, { cascade: true })
  locations: Location[]

  @ManyToOne(() => User, user => user.travelPlans, { onDelete: 'CASCADE' })
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
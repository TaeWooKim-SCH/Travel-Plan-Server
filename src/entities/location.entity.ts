import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { TravelPlan } from './travel-plan.entity'

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name: string

  @Column('decimal', { precision: 10, scale: 8 })
  lat: number

  @Column('decimal', { precision: 11, scale: 8 })
  lng: number

  @Column()
  order: number

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  address: string

  @ManyToOne(() => TravelPlan, travelPlan => travelPlan.locations, { onDelete: 'CASCADE' })
  travelPlan: TravelPlan
}
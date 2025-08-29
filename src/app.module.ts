import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TravelPlansModule } from './travel-plans/travel-plans.module'
import { AuthModule } from './auth/auth.module'
import { TravelPlan } from './entities/travel-plan.entity'
import { Location } from './entities/location.entity'
import { User } from './entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'travel-plans.db',
      entities: [TravelPlan, Location, User],
      synchronize: true,
    }),
    TravelPlansModule,
    AuthModule,
  ],
})
export class AppModule {}
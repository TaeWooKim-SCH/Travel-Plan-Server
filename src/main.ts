import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
  
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(8000)
  console.log('서버가 포트 8000에서 실행 중입니다.')
}
bootstrap()
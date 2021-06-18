import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './components/user/user.entity'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3366,
    username: 'foodzup',
    password: 'foodzup',
    database: 'test',
    entities: [User],
    synchronize: true, // set to false in production
  })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private connection: Connection) {}
}

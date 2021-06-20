import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ArticleModule } from './article/article.module';
import { MenuModule } from './menu/menu.module';
import { MneuService } from './mneu/mneu.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URI}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}?authSource=admin`,
    ),
    RestaurantModule,
    ArticleModule,
    MenuModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, MneuService],
})
export class AppModule {}

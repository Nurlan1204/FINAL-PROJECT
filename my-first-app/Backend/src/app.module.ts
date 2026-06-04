import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
        ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(
          'MONGO_URI =',
          config.get('MONGO_URI'),
        );

        return {
          uri: config.get<string>('MONGO_URI'),
        };
      },
    }),

    ProductsModule,
  ],
})
export class AppModule {}
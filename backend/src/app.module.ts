import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsModule } from './modules/products/products.module'
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configModule: ConfigService) => ({
        type: 'postgres',
        host: configModule.get('DB_HOST'),
        port: configModule.get('DB_PORT'),
        username: configModule.get('DB_USER'),
        password: configModule.get('DB_PASSWORD'),
        database: configModule.get('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    ShoppingCartModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configModule: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configModule.get('REDIS_HOST'),
            port: configModule.get('REDIS_PORT'),
          },
          ttl: configModule.get('TTL'),
        }),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number

  constructor(private readonly configModule: ConfigService) {
    AppModule.port = Number(this.configModule.get('PORT'))
  }
}

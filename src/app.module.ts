import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CacheKeyService } from './services/caching/cache-key.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from './entities/customers/customer'
import { CustomerService } from './services/customers/customer.service'
import { CustomerController } from './controllers/customer.controller'
import { AuthController } from './controllers/auth.controller'
import { CustomerPasswordService } from './services/customers/customer-password.service'
import { CustomerPassword } from './entities/customers/customer-password'
import { CacheModule } from '@nestjs/cache-manager'
import { NEST_CACHE_TTL } from './services/caching/entity-cache-defaults'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest-user',
      password: 'nest',
      database: 'nest-db',
      entities: [Customer, CustomerPassword],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Customer, CustomerPassword]),
    CacheModule.register({
      ttl: NEST_CACHE_TTL,
    }),
  ],
  controllers: [AppController, CustomerController, AuthController],
  providers: [
    AppService,
    CacheKeyService,
    CustomerService,
    CustomerPasswordService,
  ],
})
export class AppModule {}

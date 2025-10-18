import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CacheKeyService } from './services/caching/cache-key.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from './entities/customers/customer'
import { CustomerService } from './services/customers/customer.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest-user',
      password: 'nest',
      database: 'nest-db',
      entities: [Customer],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CacheKeyService, CustomerService],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CacheKeyService } from './services/caching/cache-key.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CacheKeyService],
})
export class AppModule {}

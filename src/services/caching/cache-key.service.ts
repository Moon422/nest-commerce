import { Injectable } from '@nestjs/common'

@Injectable()
export class CacheKeyService {
  prepareCacheKey(cacheKey: string, ...cacheKeyParams: string[]) {
    cacheKeyParams.forEach((param, index) => {
      cacheKey = cacheKey.replaceAll(new RegExp(`\\{${index}\\}`, 'g'), param)
    })

    return cacheKey
  }
}

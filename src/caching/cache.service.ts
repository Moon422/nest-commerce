import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import Trie from './trie'

@Injectable()
export class CacheService {
  private trie = new Trie()
  private globalTtlTimer: NodeJS.Timeout | null = null

  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {
    this.setGlobalTTL()
  }

  setGlobalTTL(ttlSeconds: number = 3600): void {
    if (this.globalTtlTimer) clearTimeout(this.globalTtlTimer)

    this.globalTtlTimer = setTimeout(async () => {
      await this.clearAll()
    }, ttlSeconds * 1000)
  }

  async setAsync(key: string, value: any): Promise<void> {
    this.trie.insert(key)
    await this.cache.set(key, value)
  }

  async getAsync<T>(key: string): Promise<T | null> {
    return (await this.cache.get(key)) || null
  }

  async removeAsync(key: string): Promise<void> {
    this.trie.removeKey(key)
    await this.cache.del(key)
  }

  async clearByPrefixAsync(prefix: string): Promise<void> {
    const keys = this.trie.getKeysWithPrefix(prefix)
    for (const key of keys) {
      await this.cache.del(key)
      this.trie.removeKey(key)
    }
  }

  async clearAll(): Promise<void> {
    this.trie.clear()
    await this.cache.clear()
  }

  stopGlobalTTL(): void {
    if (this.globalTtlTimer) clearTimeout(this.globalTtlTimer)
  }
}

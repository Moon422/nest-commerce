import { Inject, Injectable } from '@nestjs/common'
import { MessagesRepository } from './messages.repository'

@Injectable()
export class MessagesService {
  constructor(@Inject() private messagesRepository: MessagesRepository) {}

  async findOneAsync(id: number) {
    return await this.messagesRepository.findOneAsync(id)
  }

  async findAllAsync() {
    return await this.messagesRepository.findAllAsync()
  }

  async createAsync(content: string) {
    return await this.messagesRepository.createAsync(content)
  }
}

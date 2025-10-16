import { Injectable } from '@nestjs/common'
import { Message } from './message.entity'

@Injectable()
export class MessagesRepository {
  private messages: Message[] = [
    {
      id: 1,
      content: 'hi there!',
    },
    {
      id: 2,
      content: 'bye there!',
    },
  ]

  async findOneAsync(id: number) {
    return this.messages.find((msg) => msg.id === id)
  }

  async findAllAsync() {
    return this.messages
  }

  async createAsync(content: string) {
    const message = { id: this.messages.length + 1, content }
    this.messages.push(message)

    return message
  }
}

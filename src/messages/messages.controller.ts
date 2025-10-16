import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Post,
} from '@nestjs/common'
import { CreateMessageDto } from './dtos/create-message.dto'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  constructor(@Inject() private messagesService: MessagesService) {}

  @Get()
  async listMessages() {
    return {
      data: await this.messagesService.findAllAsync(),
    }
  }

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return {
      data: await this.messagesService.createAsync(createMessageDto.content),
    }
  }

  @Get(':id')
  async getMessage(@Param('id') id: number) {
    return { data: await this.messagesService.findOneAsync(id) }
  }
}

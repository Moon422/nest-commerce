import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common'

@Controller('messages')
export class MessagesController {
  @Get()
  async listMessages() {
    return { message: 'list messages' }
  }

  @Post()
  async createMessage(@Body() body, @Headers() headers) {
    return { message: 'create message', body, headers }
  }

  @Get(':id')
  getMessage(@Param('id') id: number) {
    return { message: 'get message', id }
  }
}

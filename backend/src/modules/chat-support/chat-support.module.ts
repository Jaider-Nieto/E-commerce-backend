import { Module } from '@nestjs/common';
import { ChatSupportService } from './chat-support.service';
import { ChatSupportGateway } from './chat-support.gateway';

@Module({
  providers: [ChatSupportGateway, ChatSupportService],
})
export class ChatSupportModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { ChatSupportGateway } from '../chat-support.gateway';
import { ChatSupportService } from '../chat-support.service';

describe('ChatSupportGateway', () => {
  let gateway: ChatSupportGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatSupportGateway, ChatSupportService],
    }).compile();

    gateway = module.get<ChatSupportGateway>(ChatSupportGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

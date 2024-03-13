import { Test, TestingModule } from '@nestjs/testing';
import { ChatSupportService } from '../chat-support.service';

describe('ChatSupportService', () => {
  let service: ChatSupportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatSupportService],
    }).compile();

    service = module.get<ChatSupportService>(ChatSupportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { PartialType } from '@nestjs/mapped-types'
import { CreateChatSupportDto } from './create-chat-support.dto'

export class UpdateChatSupportDto extends PartialType(CreateChatSupportDto) {
  id: number
}

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class ChatSupportGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    console.log('Client connected: ', client.id)
  }
  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ', client.id)
  }

  @SubscribeMessage('mensaje')
  handleMessage(@MessageBody() data: any) {
    console.log(data)
  }
}

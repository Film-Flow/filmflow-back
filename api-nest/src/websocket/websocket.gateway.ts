import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WebsocketGateway');
  private userSocketMap: Map<string, Socket> = new Map(); // Mapeia o ID do usuário ao Socket

  @SubscribeMessage('register')
  handleRegister(client: Socket, payload: { userId: string }) {
    console.log({
      client: client.id,
      payload,
    });
    this.userSocketMap.set(payload.userId, client);
    this.logger.log(
      `User ${payload.userId} registered with socket ${client.id}`,
    );
  }

  @SubscribeMessage('friendRequest')
  handleFriendRequest(payload: { senderId: string; receiverId: string }) {
    this.logger.log(
      `Friend request from ${payload.senderId} to ${payload.receiverId}`,
    );
    const targetSocket = this.userSocketMap.get(payload.receiverId);
    if (targetSocket) {
      this.logger.log(`Sending friend request to socket ${targetSocket.id}`);
      targetSocket.emit('friendRequest', { senderId: payload.senderId });
    } else {
      this.logger.warn(`No socket found for user ${payload.receiverId}`);
    }
  }

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.userSocketMap.forEach((socket, userId) => {
      if (socket.id === client.id) {
        this.userSocketMap.delete(userId);
        this.logger.log(
          `Client disconnected: ${client.id} with userId ${userId}`,
        );
      }
    });
  }
}

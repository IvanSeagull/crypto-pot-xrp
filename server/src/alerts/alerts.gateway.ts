import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AlertsService } from './alerts.service';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AlertsGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly alertsService: AlertsService) {}

  handleDisconnect(client: any) {
    this.alertsService.disconnect(client.id);
  }

  @SubscribeMessage('donate')
  async donate(@MessageBody() body) {
    const connections = await this.alertsService.getConnections(body.username);
    if (!connections) return;
    for (const connection of connections) {
      console.log('Emitting to', connection, body);
      this.server.to(connection).emit('new-donation', body);
    }
  }

  @SubscribeMessage('join-alerts')
  async onJoin(
    @ConnectedSocket() client: any,
    @MessageBody() username: string,
  ) {
    console.log(username);
    this.alertsService.join(username, client.id);
  }
}

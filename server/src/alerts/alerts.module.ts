import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsGateway } from './alerts.gateway';

@Module({
  providers: [AlertsGateway, AlertsService],
  exports: [AlertsService, AlertsGateway],
})
export class AlertsModule {}

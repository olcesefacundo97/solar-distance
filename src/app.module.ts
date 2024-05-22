import { Module } from '@nestjs/common';
import { SolarModule } from './solar/solar.module';

@Module({
  imports: [SolarModule],
})
export class AppModule {}
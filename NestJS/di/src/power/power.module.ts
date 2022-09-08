import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  // This allows other modules to use services that are defined below (in exports array)
  exports: [PowerService]
})
export class PowerModule {}

import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  // Import other modules. Exported services inside PowerModule can be used inside this module (cpu.module)
  imports: [PowerModule],
  providers: [CpuService],
  exports: [CpuService]
})
export class CpuModule {}

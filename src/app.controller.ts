import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';

@ApiTags('Health')
@Controller('/health')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Version([VERSION_NEUTRAL])
  @Get()
  @ApiOperation({ summary: 'Neutral Version' })
  getHealthNeutralVersion(): string {
    return 'VERSION 2,3';
  }
  @Get()
  @Version(['1'])
  @ApiOperation({ summary: 'Stable Version' })
  getHealth(): string {
    return 'VERSION 1';
  }

  @Version(['2', '4'])
  @Get()
  gethealthMultipleVersions(): string {
    return 'VERSION 2,4';
  }
}

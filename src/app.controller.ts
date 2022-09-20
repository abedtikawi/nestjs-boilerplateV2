import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Version } from '@nestjs/common';

@ApiTags('Health')
@Controller('/health')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Version(['1'])
  @ApiOperation({ summary: 'Stable Version' })
  getHealth(): string {
    return 'VERSION 1';
  }

  @Version(['2', '3'])
  @Get()
  gethealthMultipleVersions(): string {
    return 'VERSION 2,3';
  }
}

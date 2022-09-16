import { Controller, Get } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/users')
@ApiTags('Users')
export class UsersController {
  //   constructor() {}

  @Get()
  @ApiProperty({ description: 'Users' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  getHealth(): string {
    return 'hello';
  }
}

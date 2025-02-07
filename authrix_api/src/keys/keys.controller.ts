import { Controller, Post, HttpCode, HttpStatus, Body, BadRequestException } from '@nestjs/common';
import { KeysService } from './keys.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';


@ApiTags('keys')
@Controller('keys')
export class KeysController {
  constructor(private readonly keyService: KeysService) {}

  // @Post('generate')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Generate a key pair and mnemonic phrase' })
  // @ApiResponse({ status: 200, description: 'Keys generated successfully' })
  // @ApiResponse({ status: 400, description: 'Data entry error' })
  // @ApiResponse({ status: 500, description: 'Server error' })
  // @ApiBody({
  //   description: 'User data required for key generation',
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       username: { type: 'string', example: 'user123' },
  //       email: { type: 'string', example: 'user123@example.com' },
  //     },
  //     required: ['username', 'email'],
  //   },
  // })
  // generateKeys(@Body() body: { username: string; email: string }) {
  //   const { username, email } = body;
  
  //   if (!username || !email) {
  //     throw new BadRequestException('Username and email are required');
  //   }
  
  //   const keysData = this.keyService.generateKeys(username, email);
  
  //   return keysData;
  // }
}

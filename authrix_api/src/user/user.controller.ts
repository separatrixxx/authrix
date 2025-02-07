import { Controller, Post, HttpCode, HttpStatus, Query, Body, BadRequestException, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // Get public key hash
  // Получение хеша публичного ключа
  @Get('publicKey')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Getting the user's public key" })
  @ApiQuery({
    name: 'username',
    description: 'Username to search for public key',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, description: 'User information received' })
  @ApiResponse({ status: 400, description: 'Data entry error' })
  @ApiResponse({ status: 500, description: 'Error while querying NEAR' })
  async getUserPublicKey(@Query('username') username: string) {
    if (!username) {
      throw new Error('Username is required');
    }

    const publicKey = await this.userService.getUserPublicKey(username);

    if (publicKey) {
      return { message: 'User found', publicKey };
    } else {
      return { message: 'User not found' };
    }
  }

  // Getting username by mnemonic phrase
  // Получение имени пользователя по мнемонической фразе
  @Get('username')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Getting username by mnemonic phrase" })
  @ApiQuery({
    name: 'mnemonicHash',
    description: 'Mnemonic hash to search for username',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, description: 'User information received' })
  @ApiResponse({ status: 400, description: 'Data entry error' })
  @ApiResponse({ status: 500, description: 'Error while querying NEAR' })
  async getUsernameByMnemonic(@Query('mnemonicHash') mnemonicHash: string) {
    if (!mnemonicHash) {
      throw new Error('Mnemonic hash is required');
    }

    const username = await this.userService.getUsernameByMnemonic(mnemonicHash);

    if (username) {
      return { message: 'USER_FOUND', username };
    } else {
      return { message: 'USER_NOT_FOUND' };
    }
  }

  // Creating a user in the NEAR network
  // Создание пользователя в сети NEAR 
  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Saving a user to the NEAR network" })
  @ApiBody({
    description: 'Username and hash of the public key for recording in the blockchain',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'user123' },
        publicKeyHash: { type: 'string', example: '' },
        mnemonicHash: { type: 'string', example: '' },
        isChange: { type: 'boolean', example: false },
      },
      required: ['username', 'publicKeyHash, mnemonicHash'],
    },
  })
  @ApiResponse({ status: 200, description: 'User saved' })
  @ApiResponse({ status: 400, description: 'Data entry error' })
  @ApiResponse({ status: 500, description: 'Error while querying NEAR' })
  async createUser(@Body() body: { username: string; publicKeyHash: string , mnemonicHash: string, isChange?: boolean}) {
    const { username, publicKeyHash, mnemonicHash, isChange } = body;

    if (!username || !publicKeyHash || !mnemonicHash) {
      throw new BadRequestException('Username, publicKeyHash and mnemonicHash are required');
    }

    const result = await this.userService.createUser(username, publicKeyHash, mnemonicHash, isChange);

    return result;
  }

  // User verification
  // Проверка пользователя
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Check user by public key" })
  @ApiBody({
    description: 'Username and its corresponding public key hash',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'user123' },
        publicKeyHash: { type: 'string', example: '' },
      },
      required: ['username', 'publicKeyHash'],
    },
  })
  @ApiResponse({ status: 200, description: 'User verification successful' })
  @ApiResponse({ status: 400, description: 'Data entry error' })
  @ApiResponse({ status: 500, description: 'Error while querying NEAR' })
  async verifyUser(@Body() body: { username: string; publicKeyHash: string }) {
    const { username, publicKeyHash } = body;

    if (!username || !publicKeyHash) {
      throw new BadRequestException('Username and publicKeyHash are required');
    }

    const isVerify = await this.userService.verifyUser(username, publicKeyHash);

    return { isVerify };
  }
}

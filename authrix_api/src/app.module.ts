import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { KeysController } from './keys/keys.controller';
import { KeysModule } from './keys/keys.module';
import { KeysService } from './keys/keys.service';
import { UserController } from './user/user.controller';
import { ServiceModule } from './service/service.module';
import { ServiceController } from './service/service.controller';
import { ServiceService } from './service/service.service';


@Module({
  imports: [KeysModule, UserModule, ServiceModule],
  exports: [],
  controllers: [AppController, KeysController, UserController, ServiceController],
  providers: [AppService, KeysService, UserService, ServiceService],
})

export class AppModule {}

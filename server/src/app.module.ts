import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UserController } from './users/user.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { StreamChatModule } from './stream-chat/stream-chat.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, StreamChatModule],
  controllers: [AppController, UserController],
  providers: [AppService, UsersService],
})
export class AppModule {}

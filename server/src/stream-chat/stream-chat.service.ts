/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import * as admin from 'firebase-admin';
import { ChannelSort, StreamChat } from 'stream-chat';

@Injectable()
export class StreamChatService {
  client: StreamChat;

  constructor(private _configService: ConfigService) {
    this.client = StreamChat.getInstance(
      _configService.get<string>('STREAM_API_KEY'),
      _configService.get<string>('STREAM_API_SECRET'),
    );
  }

  async createUser({ id, name }: { id: string; name: string }) {
    return this.client.upsertUser({
      id,
      name,
    });
  }

  async updateUser(id: string, user: UpdateUserDto) {
    return this.client.partialUpdateUser({
      id: id,
      set: {
        ...JSON.parse(JSON.stringify(user)),
      },
    });
  }

  async createToken(userId: string) {
    return this.client.createToken(userId);
  }

  async getChannels(userID: string) {
    const filters = {
      type: 'messaging',
      members: { $in: [userID] },
    };
    const sort: ChannelSort = { last_message_at: -1 };
    const channels = await this.client.queryChannels(filters, sort);
    return channels;
  }

  async createChannel(userId: string, newUsers: string[]) {
    if (newUsers.length !== 1) {
      throw new Error('Too many users');
    }

    const ref = admin.firestore().collection('channels').doc();
    const userChannels = await this.getChannels(userId);
    const otherUserId = newUsers[0];

    const existingChannel = userChannels?.find((channel) => {
      const members = Object.values(channel.state.members);
      return (
        members.length === 2 &&
        members.some((member) => member.user?.id === userId) &&
        members.some((member) => member.user?.id === otherUserId)
      );
    });

    if (existingChannel) {
      return existingChannel;
    }

    const channel = this.client.channel('messaging', ref.id, {
      members: [otherUserId, userId],
      created_by: { id: userId },
    });
    await channel.create();
    return channel;
  }
}

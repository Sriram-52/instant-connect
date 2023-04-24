/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { StreamChatService } from 'src/stream-chat/stream-chat.service';

@Injectable()
export class UsersService {
  constructor(private _streamChatService: StreamChatService) {}

  async findAll(): Promise<User[]> {
    const ref = admin.firestore().collection('users');
    const snapshot = await ref.get();
    const users: User[] = snapshot.docs.map((doc) => User.fromJson(doc.data()));
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name } = createUserDto;
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    const user: User = {
      id: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };

    await this._streamChatService.createUser({
      id: user.id,
      name,
    });

    const ref = admin.firestore().collection('users').doc(userRecord.uid);
    await ref.set(user);

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, email } = updateUserDto;
    const ref = admin.firestore().collection('users').doc(id);

    if (name) {
      await admin.auth().updateUser(id, { displayName: name });
      await ref.update({ name });
    }

    if (email) {
      await admin.auth().updateUser(id, { email });
      await ref.update({ email });
    }

    await this._streamChatService.updateUser(id, {
      name,
    });

    if (name || email) {
      await ref.update({ updatedAt: new Date().toISOString() });
    }

    const snapshot = await ref.get();
    const user: User = User.fromJson(snapshot.data());

    return user;
  }

  async getToken(id: string) {
    return this._streamChatService.createToken(id);
  }

  async createChannel(id: string, members: string[]) {
    const channel = await this._streamChatService.createChannel(id, members);
    return channel.id;
  }
}

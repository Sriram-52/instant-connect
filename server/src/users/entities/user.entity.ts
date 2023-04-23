import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string | null;

  static fromJson(data: any): User {
    const user = new User();
    user.id = data.id;
    user.email = data.email;
    user.name = data.name;
    user.createdAt = data.createdAt;
    user.updatedAt = data.updatedAt;
    return user;
  }

  static toJson(user: User): Record<string, unknown> {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

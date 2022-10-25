import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword } from '../helpers/hash.helper';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const verifyUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (verifyUser) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      const newUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: await hashPassword(createUserDto.password),
        },
      });

      return { userId: newUser.id };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

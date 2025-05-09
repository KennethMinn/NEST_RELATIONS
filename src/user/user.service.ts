import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    return this.repo.save(user);
  }

  findAll(where: QueryUserDto) {
    return this.repo.find({ where });
  }

  async findOneById(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);

    Object.assign(user, updateUserDto);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    return this.repo.remove(user);
  }
}

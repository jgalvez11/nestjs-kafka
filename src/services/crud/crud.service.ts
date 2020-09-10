import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDTO } from 'src/models/schemas/user.schema';
import { Model } from 'mongoose';
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaConnection } from 'src/config/kafkaConnection.config';

@Injectable()
export class CrudService {
  @Client(kafkaConnection)
  client: ClientKafka;

  constructor(@InjectModel(User.name) private userSchema: Model<User>) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async publish(topic: string, payload: UserDTO) {
    this.client.emit<string>(topic, payload);
  }

  async findAll(query: any) {
    const list = await this.userSchema
      .find({ name: { $options: 'i', $regex: query.name || '' } })
      .select({ __v: 0 })
      .exec();
    return list;
  }

  async findById(id: string) {
    const user = await this.userSchema.findById(id).exec();
    this.publish('test-kafka-v2', user);
    return user;
  }

  async create(dto: UserDTO) {
    const user = new this.userSchema(dto);
    return await user.save();
  }

  async update(id: string, dto: any) {
    const update = await this.userSchema
      .findOneAndUpdate({ _id: id }, dto, {
        new: true,
      })
      .select({ __v: 0 })
      .exec();

    if (!update) {
      return {
        status: false,
        message: 'No actualizado',
      };
    }

    return update;
  }

  async delete(id: string) {
    const deleted = await this.userSchema.findByIdAndDelete(id).exec();

    if (!deleted) {
      return {
        status: false,
        message: 'No encontrado',
      };
    }

    return deleted;
  }
}

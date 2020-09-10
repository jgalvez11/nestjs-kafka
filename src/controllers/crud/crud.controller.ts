import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CrudService } from 'src/services/crud/crud.service';
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';

@Controller('crud')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: any) {
    return this.crudService.findAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string) {
    return this.crudService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: any) {
    return await this.crudService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id') id: string, @Body() dto: any) {
    return this.crudService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id') id: string) {
    return this.crudService.delete(id);
  }

  @MessagePattern('test-kafka-v2')
  getTestKafka(@Payload() user: KafkaMessage, @Ctx() context: KafkaContext) {
    console.log('######MESSAGE#######');
    console.log(context.getMessage());
    console.log('######VALUE#######');
    console.log(user.value);
  }
}

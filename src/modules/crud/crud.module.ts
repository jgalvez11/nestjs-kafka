import { Module } from '@nestjs/common';
import { CrudController } from 'src/controllers/crud/crud.controller';
import { CrudService } from 'src/services/crud/crud.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule {}

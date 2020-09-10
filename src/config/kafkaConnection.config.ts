import { Transport } from '@nestjs/microservices';
import { logLevel } from 'kafkajs';

export const kafkaConnection: any = {
  name: 'KAFKA_SERVICE',
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
      logLevel: [logLevel.ERROR, logLevel.INFO, logLevel.WARN],
    },
    consumer: {
      groupId: 'test-consumer',
    },
  },
};

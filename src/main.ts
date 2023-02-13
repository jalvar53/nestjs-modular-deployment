import { NestFactory } from '@nestjs/core';
import { AppModule, ServerType } from './app.module';

async function bootstrap() {
  let type: ServerType = process.env.SERVER_TYPE as ServerType;
  if (!type) {
    type = ServerType.ALL;
  }
  const app = await NestFactory.create(AppModule.register(type));
  await app.listen(3000);
}
bootstrap();

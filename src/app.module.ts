import { BatchProcessor } from './batch-processor.service';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { QueueHandler } from './queue-handler';

export enum ServerType {
  CRON = 'cron',
  WEB_API = 'webapi',
  QUEUE_HANDLER = 'queuehandler',
  ALL = 'all'
}

@Module({})
export class AppModule {
  static register(mode: ServerType): DynamicModule {
    let apiControllers = [];
    const defaultImports = [];
    const defaultProviders: Provider[] = [AppService];
    const exports = [];
    if ([ServerType.CRON, ServerType.ALL].includes(mode)) {
      // Add Nest.js scheduler module
      defaultImports.push(ScheduleModule.forRoot());
      defaultProviders.push(BatchProcessor);
    }

    if ([ServerType.WEB_API, ServerType.ALL].includes(mode)) {
      apiControllers = [
        AppController,
      ];
    }
    if ([ServerType.QUEUE_HANDLER, ServerType.ALL].includes(mode)) {
      apiControllers.push(QueueHandler);
    }
    return {
      module: AppModule,
      imports: defaultImports,
      controllers: apiControllers,
      providers: defaultProviders,
      exports: exports,
    };
  }
}

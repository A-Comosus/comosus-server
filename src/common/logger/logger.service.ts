import { BadRequestException, ConsoleLogger } from '@nestjs/common';

export class CustomLoggerService extends ConsoleLogger {
  error(message: any, stack?: string) {
    super.error(message, stack);
    throw new BadRequestException(message);
  }
}

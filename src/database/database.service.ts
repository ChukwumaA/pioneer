import { Logger } from '@nestjs/common';
import { cwd } from 'process';
import { DataSource } from 'typeorm';

export class DatabaseService {
  static async connect(): Promise<void> {
    const logger: Logger = new Logger();
    const ConnectionSource = new DataSource({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [cwd() + '/dist/src/**/*.entity.js'],
    });

    await ConnectionSource.initialize()
      .then(() => logger.log('[Database]: DataSource connection successful...'))
      .catch((e) =>
        logger.error(`[Database]: DataSource connection failed: ${e.message}`),
      );
  }
}

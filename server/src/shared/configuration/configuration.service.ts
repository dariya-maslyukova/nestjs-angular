import { Injectable } from '@nestjs/common';
import { get } from 'config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { Configuration } from './configuration.enum';

@Injectable()
export class ConfigurationService {
  static connectionString: string = process.env[Configuration.MONGO_URI] || get(Configuration.MONGO_URI);
  private environmentHosting: string = process.env.NODE_ENV || 'development';
  private host: string = process.env[Configuration.HOST] || get(Configuration.HOST);
  private port: string = process.env[Configuration.PORT] || get(Configuration.PORT);

  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key] || get(key);
  }

  // get(name: string): string {
  //   return process.env[name] || get(name);
  // }

  get isDevelopment(): boolean {
    return this.environmentHosting === 'development';
  }

  get hostName(): string {
    return this.isDevelopment ? `${this.host}:${this.port}` : this.host;
  }
}

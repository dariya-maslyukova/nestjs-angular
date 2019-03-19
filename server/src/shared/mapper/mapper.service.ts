import { Injectable } from '@nestjs/common';
import 'automapper-ts/dist/automapper';

@Injectable()
export class MapperService {
  mapper: AutoMapperJs.AutoMapper;

  constructor() {
    this.mapper = automapper;
    this.initializeMapper();
  }

  private initializeMapper(): void {
    this.mapper.initialize(MapperService.configure);
  }

  private static configure(config: AutoMapperJs.IConfiguration): void {
    config
      .createMap('User', 'UserVm')
      .forSourceMember('_id', opts => opts.ignored())
      .forSourceMember('Password', opts => opts.ignore());

    config.createMap('Todo', 'TodoVm').forSourceMember('_id', opts => opts.ignore());
    config.createMap('Slider', 'SliderVm').forSourceMember('_id', opts => opts.ignore());
    config.createMap('Product', 'ProductVm').forSourceMember('_id', opts => opts.ignore());
  }
}
